import { DITHER_LIGHT_RGB, ditherCoverage, lightIntensity } from "@/lib/dither-light";

// The desktop pass from waitlist.css, in CSS px. Keep these in step with the stylesheet.
const CARD_W = 386, CARD_H = 600, RADIUS = 28, PAD = 32;
// A 4:5 portrait shows uncropped in Instagram, X, WhatsApp and LinkedIn feeds.
const WIDTH = 1080, HEIGHT = 1350, S = 1.45;
const CARD_X = (WIDTH - CARD_W * S) / 2, CARD_Y = 390;
const LANYARD_W = 130;
const INK = "#fcfcfc";

type Ctx = CanvasRenderingContext2D;
export type PassImageInput = { holder: string; avatarUrl: string; fontFamily: string; site: string };

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
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

function truncate(ctx: Ctx, value: string, max: number) {
  if (ctx.measureText(value).width <= max) return value;
  let text = value;
  while (text.length > 1 && ctx.measureText(`${text}…`).width > max) text = text.slice(0, -1);
  return `${text.trimEnd()}…`;
}

/** Inner shadow: shade cast by everything outside the card, clipped to the card. Shadows ignore the transform. */
function insetShadow(ctx: Ctx, offsetY: number, blur: number, color: string) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(-200, -200, CARD_W + 400, CARD_H + 400);
  roundedRect(ctx, 0, 0, CARD_W, CARD_H, RADIUS);
  ctx.shadowColor = color;
  ctx.shadowBlur = blur * S;
  ctx.shadowOffsetY = offsetY * S;
  ctx.fillStyle = "#000";
  ctx.fill("evenodd");
  ctx.restore();
}

/** The page's dither light, centred on the pass the way the scene centres it, at half resolution. */
function drawLight(ctx: Ctx) {
  const boxW = 1060 * S, boxH = 950 * S;
  const left = WIDTH / 2 - boxW / 2;
  const top = CARD_Y + CARD_H * S / 2 - 40 * S - boxH * .45;
  const w = WIDTH / 2, h = HEIGHT / 2;
  const field = new ImageData(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    field.data[i] = DITHER_LIGHT_RGB[0]; field.data[i + 1] = DITHER_LIGHT_RGB[1]; field.data[i + 2] = DITHER_LIGHT_RGB[2];
    field.data[i + 3] = ditherCoverage(lightIntensity((x * 2 + 1 - left) / boxW * 2 - 1, (y * 2 + 1 - top) / boxH * 2 - 1), x, y);
  }
  const layer = document.createElement("canvas");
  layer.width = w; layer.height = h;
  layer.getContext("2d")!.putImageData(field, 0, 0);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(layer, 0, 0, WIDTH, HEIGHT);
  ctx.restore();
}

/** `.waitlist-card-art`: foil at 78%, its two scrims, then the fade-out mask. */
function drawCardArt(ctx: Ctx, foil: HTMLImageElement) {
  const w = Math.round(CARD_W * S), h = Math.round(315 * S);
  const art = document.createElement("canvas");
  art.width = w; art.height = h;
  const a = art.getContext("2d")!;
  a.globalAlpha = .78;
  a.drawImage(foil, 0, 0, w, w);
  a.globalAlpha = 1;
  let g = a.createLinearGradient(0, 0, 0, 84 * S);
  g.addColorStop(0, "#18151fc4"); g.addColorStop(1, "#18151f00");
  a.fillStyle = g; a.fillRect(0, 0, w, h);
  g = a.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, "#28262440"); g.addColorStop(.7, "#28262408"); g.addColorStop(1, "#28262408");
  a.fillStyle = g; a.fillRect(0, 0, w, h);
  a.globalCompositeOperation = "destination-in";
  g = a.createLinearGradient(0, 0, 0, h);
  g.addColorStop(.12, "#000"); g.addColorStop(.35, "#000c"); g.addColorStop(.93, "#0000");
  a.fillStyle = g; a.fillRect(0, 0, w, h);
  ctx.drawImage(art, 0, 0, CARD_W, 315);
}

function drawGrain(ctx: Ctx, grain: HTMLImageElement) {
  const size = Math.round(180 * S);
  const tile = document.createElement("canvas");
  tile.width = size; tile.height = size;
  tile.getContext("2d")!.drawImage(grain, 0, 0, size, size);
  const pattern = ctx.createPattern(tile, "repeat");
  if (!pattern) return;
  pattern.setTransform(new DOMMatrix().scale(1 / S));
  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = .12;
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  ctx.restore();
}

function drawAvatar(ctx: Ctx, avatar: HTMLImageElement | null) {
  const cx = CARD_W / 2, cy = 184 + (CARD_H - 32 - 112 - 184) / 2;
  // `0 18px 40px -18px #000c`: the shape is drawn far off-canvas so only its shadow lands.
  ctx.save();
  ctx.shadowColor = "#000000cc";
  ctx.shadowBlur = 40 * S;
  ctx.shadowOffsetY = (10000 + 18) * S;
  ctx.beginPath(); ctx.arc(cx, cy - 10000, 90 - 18, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI * 2);
  ctx.fillStyle = cssGradient(ctx, 145, cx - 90, cy - 90, 180, 180, [[0, "#dfd3f9"], [.27, "#b7a0e3"], [.58, "#8d6bbf"], [.9, "#c6b4e8"]]);
  ctx.fill();
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, 85, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = "#c0aede"; ctx.fillRect(cx - 85, cy - 85, 170, 170);
  if (avatar) ctx.drawImage(avatar, cx - 85, cy - 85, 170, 170);
  ctx.restore();
}

/** Draws the joined pass as a shareable PNG. */
export async function renderPassImage({ holder, avatarUrl, fontFamily, site }: PassImageInput): Promise<Blob> {
  const [lanyard, foil, grain, avatar] = await Promise.all([
    loadImage("/art/waitlist/lanyard-estelle.webp"),
    loadImage("/art/waitlist/foil-relief.webp"),
    loadImage("/art/tonal-grain.png"),
    avatarUrl ? loadImage(avatarUrl).catch(() => null) : null,
    document.fonts.load(`490 27px ${fontFamily}`),
    document.fonts.load(`470 30px ${fontFamily}`),
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH; canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#131211";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawLight(ctx);

  ctx.save();
  ctx.translate(CARD_X, CARD_Y);
  ctx.scale(S, S);
  ctx.save();
  ctx.beginPath(); roundedRect(ctx, 0, 0, CARD_W, CARD_H, RADIUS); ctx.clip();
  ctx.fillStyle = cssGradient(ctx, 145, 0, 0, CARD_W, CARD_H, [[0, "#34322f"], [.6, "#282624"], [1, "#242220"]]);
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  drawCardArt(ctx, foil);
  drawGrain(ctx, grain);
  insetShadow(ctx, 1, 1, "#e7dfce24");
  insetShadow(ctx, -2, 3, "#00000033");
  ctx.beginPath(); roundedRect(ctx, .5, .5, CARD_W - 1, CARD_H - 1, RADIUS - .5);
  ctx.strokeStyle = "#e7dfce0e"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();

  ctx.beginPath(); roundedRect(ctx, CARD_W / 2 - 15, 16, 30, 9, 4.5); ctx.fillStyle = "#ffffff20"; ctx.fill();
  ctx.beginPath(); roundedRect(ctx, CARD_W / 2 - 15, 15, 30, 9, 4.5); ctx.fillStyle = "#121110"; ctx.fill();

  drawText(ctx, "FOUNDING MEMBER", PAD, PAD + 1.5, 13.5, `500 9px ${fontFamily}`, .9, "#e8e1ed");
  drawText(ctx, "Estelle", CARD_W - PAD, PAD, 16.5, `500 11px ${fontFamily}`, -.22, "#e8e1ed", "right");
  const captionTop = PAD + 16.5 + 47;
  drawText(ctx, "I have joined the", PAD, captionTop, 32.4, `490 27px ${fontFamily}`, -1.215, INK);
  drawText(ctx, "Estelle waitlist.", PAD, captionTop + 32.4, 32.4, `490 27px ${fontFamily}`, -1.215, INK);
  drawAvatar(ctx, avatar);
  const ownerTop = CARD_H - 33 - (13.5 + 7 + 2 * 34.8);
  ctx.font = `500 9px ${fontFamily}`;
  ctx.letterSpacing = "1.08px";
  const label = truncate(ctx, (holder || "Your legacy begins").toUpperCase(), CARD_W - PAD * 2);
  drawText(ctx, label, PAD, ownerTop, 13.5, `500 9px ${fontFamily}`, 1.08, "#aaa49b");
  drawText(ctx, "Your story.", PAD, ownerTop + 20.5, 34.8, `470 30px ${fontFamily}`, -1.2, INK);
  drawText(ctx, "Our mission.", PAD, ownerTop + 20.5 + 34.8, 34.8, `470 30px ${fontFamily}`, -1.2, INK);
  ctx.restore();

  const lanyardH = LANYARD_W * lanyard.naturalHeight / lanyard.naturalWidth;
  ctx.drawImage(lanyard, WIDTH / 2 - LANYARD_W / 2, CARD_Y + 30 * S - lanyardH, LANYARD_W, lanyardH);
  const cardBottom = CARD_Y + CARD_H * S;
  drawText(ctx, `${site}/waitlist`, WIDTH / 2, cardBottom + (HEIGHT - cardBottom) / 2 - 18, 36, `500 24px ${fontFamily}`, 0, "#8b857d", "center");

  return new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("export")), "image/png"));
}
