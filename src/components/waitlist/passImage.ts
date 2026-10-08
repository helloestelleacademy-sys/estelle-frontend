// Redraws the joined side of WaitlistPass as a shareable PNG. Measurements are the desktop
// card in CSS px (p-8, text sizes, colours from waitlist/page.tsx tokens); keep them in step.
const CARD_W = 386, RADIUS = 28, PAD = 32, CLIP_DROP = 58, MIN_H = 600;
// A 4:5 portrait shows uncropped in Instagram, X, WhatsApp and LinkedIn feeds.
const WIDTH = 1080, HEIGHT = 1350, S = 1.5;
const CARD_X = (WIDTH - CARD_W * S) / 2, CARD_Y = 330;
const HEADING_LINE = 28 * 1.15, AVATAR_BLOCK = 32 + 156 + 32, OWNER_BLOCK = 16 + 8 + HEADING_LINE * 2 + 12 + 20;
const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
const CLIP = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="46" height="74" viewBox="0 0 46 74" fill="none"><defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1eef5"/><stop offset="0.5" stop-color="#8d8896"/><stop offset="1" stop-color="#4d4957"/></linearGradient></defs><rect x="12" y="0" width="22" height="16" rx="3" fill="url(#m)"/><path d="M23 12c-10 0-15 6-15 14v14h8V26c0-4 3-6 7-6s7 2 7 6v14h8V26c0-8-5-14-15-14Z" fill="url(#m)"/><rect x="14" y="40" width="18" height="30" rx="5" fill="url(#m)"/><rect x="19" y="46" width="8" height="12" rx="3" fill="#1b1822"/></svg>`)}`;

type Ctx = CanvasRenderingContext2D;
export type PassFonts = { display: string; body: string; serif: string };
export type PassImageInput = { greeting: string; from: string; avatarUrl: string; fonts: PassFonts; site: string };

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

function roundedRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A canvas gradient that follows CSS `linear-gradient(<angle>deg, …)` over a box. */
function cssGradient(ctx: Ctx, angle: number, x: number, y: number, w: number, h: number, stops: [number, string][]) {
  const rad = angle * Math.PI / 180;
  const dx = Math.sin(rad), dy = -Math.cos(rad);
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2;
  const cx = x + w / 2, cy = y + h / 2;
  const gradient = ctx.createLinearGradient(cx - dx * half, cy - dy * half, cx + dx * half, cy + dy * half);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  return gradient;
}

/** CSS `radial-gradient(ellipse rx ry at cx cy, color, transparent end)` painted over a box. */
function radialEllipse(ctx: Ctx, box: { x: number; y: number; w: number; h: number }, cx: number, cy: number, rx: number, ry: number, color: string, end: number) {
  ctx.save();
  ctx.translate(box.x + cx * box.w, box.y + cy * box.h);
  ctx.scale(rx * box.w, ry * box.h);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  gradient.addColorStop(0, color);
  gradient.addColorStop(end, color.slice(0, 7) + "00");
  ctx.fillStyle = gradient;
  ctx.fillRect(-cx / rx, -cy / ry, 1 / rx, 1 / ry);
  ctx.restore();
}

/** Places text in a CSS line box: the font's content area is centred in the line, as the browser does. */
function drawText(ctx: Ctx, value: string, x: number, lineTop: number, lineHeight: number, font: string, tracking: number, color: string, align: CanvasTextAlign = "left") {
  ctx.font = font;
  ctx.letterSpacing = `${tracking}px`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } = ctx.measureText(value);
  ctx.fillText(value, x, lineTop + (lineHeight - ascent - descent) / 2 + ascent);
}

function wrap(ctx: Ctx, value: string, max: number) {
  const lines: string[] = [];
  for (const word of value.split(" ")) {
    const last = lines[lines.length - 1];
    if (last !== undefined && ctx.measureText(`${last} ${word}`).width <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

function truncate(ctx: Ctx, value: string, max: number) {
  if (ctx.measureText(value).width <= max) return value;
  let text = value;
  while (text.length > 1 && ctx.measureText(`${text}…`).width > max) text = text.slice(0, -1);
  return `${text.trimEnd()}…`;
}

/** Shadow only: the shape is drawn far off-canvas and its shadow is offset back into place. Shadows ignore the transform. */
function dropShadow(ctx: Ctx, path: (offsetY: number) => void, offsetY: number, blur: number, color: string) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = blur * S;
  ctx.shadowOffsetY = (10000 + offsetY) * S;
  ctx.beginPath();
  path(-10000);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();
}

/** Inner shadow: shade cast by everything outside the shape, clipped to the shape. */
function insetShadow(ctx: Ctx, path: () => void, offsetY: number, blur: number, color: string) {
  ctx.save();
  ctx.beginPath(); path(); ctx.clip();
  ctx.beginPath();
  ctx.rect(-500, -500, 2000, 2000);
  path();
  ctx.shadowColor = color;
  ctx.shadowBlur = blur * S;
  ctx.shadowOffsetY = offsetY * S;
  ctx.fillStyle = "#000";
  ctx.fill("evenodd");
  ctx.restore();
}

/** The violet strap, straight as it hangs at rest, with its ribbing and "ESTELLE ·" lettering. */
function drawStrap(ctx: Ctx, bottom: number, font: string) {
  const cx = WIDTH / 2;
  ctx.fillStyle = "#6f4aa0";
  ctx.fillRect(cx - 13 * S, 0, 26 * S, bottom);
  ctx.fillStyle = "#ffffff14";
  for (let y = 0; y < bottom; y += 4 * S) ctx.fillRect(cx - 10 * S, y, 20 * S, 1 * S);
  ctx.save();
  // The lettering stops where the strap does.
  ctx.beginPath(); ctx.rect(cx - 13 * S, 0, 26 * S, bottom); ctx.clip();
  ctx.translate(cx, 0);
  ctx.rotate(Math.PI / 2);
  ctx.font = `600 ${9 * S}px ${font}`;
  ctx.letterSpacing = `${9 * .35 * S}px`;
  ctx.fillStyle = "#ffffff99";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("ESTELLE · ".repeat(12), 0, 3 * S);
  ctx.restore();
}

function drawAvatar(ctx: Ctx, cx: number, cy: number, avatar: HTMLImageElement | null) {
  // Each circle starts at its own edge, so no stray line joins it to a shape already in the path.
  const circle = (radius: number, offsetY = 0) => { ctx.moveTo(cx + radius, cy + offsetY); ctx.arc(cx, cy + offsetY, radius, 0, Math.PI * 2); };
  const ring = () => circle(78);
  // `0 20px 50px -10px #7852A9aa`
  dropShadow(ctx, offsetY => circle(68, offsetY), 20, 50, "#7852a9aa");
  const focus = { x: cx - 78 + .3 * 156, y: cy - 78 + .25 * 156 };
  const gradient = ctx.createRadialGradient(focus.x, focus.y, 0, focus.x, focus.y, Math.hypot(cx + 78 - focus.x, cy + 78 - focus.y));
  gradient.addColorStop(0, "#d9b3ff"); gradient.addColorStop(.6, "#7852a9"); gradient.addColorStop(1, "#4b2f78");
  ctx.beginPath(); ring(); ctx.fillStyle = gradient; ctx.fill();
  insetShadow(ctx, () => ring(), 2, 4, "#ffffff55");
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, 72, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = "#c0aede"; ctx.fillRect(cx - 72, cy - 72, 144, 144);
  if (avatar) ctx.drawImage(avatar, cx - 72, cy - 72, 144, 144);
  ctx.restore();
}

/** Draws the joined pass as a shareable PNG. */
export async function renderPassImage({ greeting, from, avatarUrl, fonts, site }: PassImageInput): Promise<Blob> {
  // Canvas text draws a little heavier than the page's; 560 here matches the page's 600.
  const heading = `560 28px ${fonts.display}`;
  const [clip, grain, avatar] = await Promise.all([
    loadImage(CLIP),
    loadImage(GRAIN).catch(() => null),
    avatarUrl ? loadImage(avatarUrl).catch(() => null) : null,
    document.fonts.load(heading, from),
    document.fonts.load(`600 12px ${fonts.body}`),
    document.fonts.load(`16px ${fonts.serif}`),
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH; canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;

  // Heading lines first: a long country name wraps, and the card grows like the page's does.
  ctx.font = heading;
  ctx.letterSpacing = "-0.84px";
  const fromLines = wrap(ctx, from, CARD_W - PAD * 2);
  const headingLines = 2 + fromLines.length;
  const cardH = Math.max(MIN_H, PAD + 36 + 32 + headingLines * HEADING_LINE + AVATAR_BLOCK + OWNER_BLOCK + PAD);

  ctx.fillStyle = "#0f0d14";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  // The scene glow: two soft violet ellipses in a 1060 × 950 box centred just above the pass.
  const glow = { w: 1060 * S, h: 950 * S, x: 0, y: 0 };
  glow.x = WIDTH / 2 - glow.w / 2;
  glow.y = CARD_Y + cardH * S / 2 - 40 * S - glow.h * .45;
  radialEllipse(ctx, glow, .26, .35, .3, .42, "#7852a955", .95);
  radialEllipse(ctx, glow, .75, .65, .3, .42, "#a984dd40", .95);

  const clipTop = CARD_Y - CLIP_DROP * S;
  drawStrap(ctx, clipTop + 4 * S, fonts.body);
  ctx.save();
  ctx.shadowColor = "#00000080"; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4;
  ctx.drawImage(clip, WIDTH / 2 - 23 * S, clipTop, 46 * S, 74 * S);
  ctx.restore();

  ctx.save();
  ctx.translate(CARD_X, CARD_Y);
  ctx.scale(S, S);
  const card = (offsetY = 0) => roundedRect(ctx, 0, offsetY, CARD_W, cardH, RADIUS);
  // `0 40px 80px -24px #000000b0`
  dropShadow(ctx, offsetY => roundedRect(ctx, 24, offsetY + 24, CARD_W - 48, cardH - 48, 4), 40, 80, "#000000b0");
  ctx.save();
  ctx.beginPath(); card(); ctx.clip();
  ctx.fillStyle = cssGradient(ctx, 150, 0, 0, CARD_W, cardH, [[0, "#2d2738"], [.65, "#1d1925"], [1, "#1d1925"]]);
  ctx.fillRect(0, 0, CARD_W, cardH);
  if (grain) {
    const tile = document.createElement("canvas");
    tile.width = tile.height = Math.round(160 * S);
    tile.getContext("2d")!.drawImage(grain, 0, 0, tile.width, tile.height);
    const pattern = ctx.createPattern(tile, "repeat");
    if (pattern) {
      pattern.setTransform(new DOMMatrix().scale(1 / S));
      ctx.save(); ctx.globalCompositeOperation = "soft-light"; ctx.globalAlpha = .14; ctx.fillStyle = pattern; ctx.fillRect(0, 0, CARD_W, cardH); ctx.restore();
    }
  }
  radialEllipse(ctx, { x: 0, y: 0, w: CARD_W, h: 240 }, .5, 0, .8, .9, "#7852a94d", .75);
  insetShadow(ctx, () => card(), 1, 1, "#ffffff2e");
  ctx.beginPath(); roundedRect(ctx, .5, .5, CARD_W - 1, cardH - 1, RADIUS - .5);
  ctx.strokeStyle = "#ffffff10"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();

  ctx.beginPath(); roundedRect(ctx, CARD_W / 2 - 15, 16, 30, 9, 4.5); ctx.fillStyle = "#ffffff20"; ctx.fill();
  ctx.beginPath(); roundedRect(ctx, CARD_W / 2 - 15, 15, 30, 9, 4.5); ctx.fillStyle = "#0f0d14"; ctx.fill();

  drawText(ctx, "FOUNDING MEMBER", PAD, PAD + 12 + 4, 16, `600 12px ${fonts.body}`, 1.44, "#ffffffbf");
  drawText(ctx, "Estelle", CARD_W - PAD, PAD + 12, 24, `16px ${fonts.serif}`, 0, "#d9b3ff", "right");
  const headingTop = PAD + 36 + 32;
  drawText(ctx, "I have joined", PAD, headingTop, HEADING_LINE, heading, -.84, "#ffffff");
  drawText(ctx, "Estelle waitlist", PAD, headingTop + HEADING_LINE, HEADING_LINE, heading, -.84, "#ffffff");
  fromLines.forEach((line, i) => drawText(ctx, line, PAD, headingTop + (2 + i) * HEADING_LINE, HEADING_LINE, heading, -.84, "#d9b3ff"));

  const avatarTop = headingTop + headingLines * HEADING_LINE;
  const ownerTop = cardH - PAD - OWNER_BLOCK;
  drawAvatar(ctx, CARD_W / 2, (avatarTop + ownerTop) / 2, avatar);
  ctx.font = `600 12px ${fonts.body}`;
  ctx.letterSpacing = "1.44px";
  drawText(ctx, truncate(ctx, greeting, CARD_W - PAD * 2), PAD, ownerTop, 16, `600 12px ${fonts.body}`, 1.44, "#ffffffa6");
  drawText(ctx, "Your story.", PAD, ownerTop + 24, HEADING_LINE, heading, -.84, "#ffffff");
  drawText(ctx, "Our mission.", PAD, ownerTop + 24 + HEADING_LINE, HEADING_LINE, heading, -.84, "#ffffff");
  drawText(ctx, "We'll email you the moment we open the doors.", PAD, ownerTop + 24 + HEADING_LINE * 2 + 12, 20, `14px ${fonts.body}`, 0, "#ffffffb3");
  ctx.restore();

  const cardBottom = CARD_Y + cardH * S;
  drawText(ctx, `${site}/waitlist`, WIDTH / 2, cardBottom + (HEIGHT - cardBottom) / 2 - 18, 36, `500 24px ${fonts.body}`, 0, "#a99fb8", "center");

  return new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("export")), "image/png"));
}
