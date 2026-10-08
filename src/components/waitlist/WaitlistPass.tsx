"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  animate,
  motion,
  type MotionValue,
  type PanInfo,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ChevronDown, Download, MoveRight, Share } from "lucide-react";
import type { Country } from "./countries";
import { CountrySheet } from "./CountrySheet";
import { renderPassImage } from "./passImage";

type Phase = "form" | "saving" | "joined";
type Pass = { file: File; shareable: boolean } | "failed" | null;
type FieldName = "name" | "email" | "phone" | "country";

const FIELDS: {
  name: FieldName;
  label: string;
  type: string;
  autoComplete: string;
  inputMode?: "email" | "tel";
  placeholder: string;
  maxLength: number;
  half?: boolean;
}[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your full name", maxLength: 80 },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", inputMode: "email", placeholder: "you@example.com", maxLength: 254 },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+234 801 234", maxLength: 30, half: true },
  { name: "country", label: "Country", type: "select", autoComplete: "country-name", placeholder: "Select country", maxLength: 60, half: true },
];

const VALIDATE: Record<FieldName, (value: string) => string> = {
  name: (v) => (v ? "" : "Enter your name."),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? "" : "Enter a valid email, like you@example.com."),
  phone: (v) => (v.replace(/\D/g, "").length >= 7 ? "" : "Enter a phone number, including country code."),
  country: (v) => (v ? "" : "Choose your country."),
};

const FAILURE = "We couldn’t save your spot. Please try again.";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/HsGoAAg3ww9LQ0NIs0Sy69?mode=gi_t";

// Avatars are drawn on the device: instant, offline, and no third-party request. Prewarmed on form focus.
let avatarModules: Promise<[typeof import("@dicebear/core"), typeof import("@dicebear/micah")]> | undefined;
function loadAvatarModules() {
  avatarModules ??= Promise.all([import("@dicebear/core"), import("@dicebear/micah")]);
  avatarModules.catch(() => { avatarModules = undefined; });
  return avatarModules;
}

function download(file: File) {
  const href = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = href;
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

/** WhatsApp glyph, Simple Icons (CC0). */
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
// The clip sits this far above the card; the card pivots here and the strap attaches here.
const CLIP_DROP = 58;
const SWING = { type: "spring", stiffness: 120, damping: 7 } as const;
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const inputClass =
  "h-12 w-full rounded-[10px] border-0 bg-white/[0.05] px-4 text-base text-white outline-none transition-[background-color,box-shadow] duration-150 placeholder:text-white/45 focus-visible:bg-white/[0.09] focus-visible:shadow-[inset_0_0_0_1px_var(--wl-accent-soft)] aria-invalid:shadow-[inset_0_0_0_1px_var(--wl-error)]";

/** The strap: a live curve from an anchor above the viewport to the clip, trailing the card as it moves. */
function Strap({ x, y, anchor }: { x: MotionValue<number>; y: MotionValue<number>; anchor: MotionValue<number> }) {
  const id = useId();
  const lagX = useSpring(x, { stiffness: 70, damping: 12 });
  const d = useTransform(() => {
    const top = anchor.get();
    const endY = y.get() - CLIP_DROP;
    const slack = Math.max(0, -y.get()) * 0.35;
    return `M 0 ${top} Q ${lagX.get() * 0.6 + slack} ${(top + endY) / 2} ${x.get()} ${endY}`;
  });

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 overflow-visible" width="1" height="1">
      <motion.path id={id} d={d} fill="none" stroke="var(--wl-strap)" strokeWidth={26} />
      <motion.path d={d} fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={20} strokeDasharray="1 3" />
      <text dy="3" className="fill-white/60 text-[9px] font-semibold tracking-[0.35em]">
        <textPath href={`#${id}`}>{"ESTELLE · ".repeat(14)}</textPath>
      </text>
    </svg>
  );
}

function Clip() {
  return (
    <svg aria-hidden="true" className="absolute left-1/2 -translate-x-1/2" style={{ top: -CLIP_DROP }} width="46" height="74" viewBox="0 0 46 74" fill="none">
      <defs>
        <linearGradient id="wl-clip-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1eef5" />
          <stop offset="0.5" stopColor="#8d8896" />
          <stop offset="1" stopColor="#4d4957" />
        </linearGradient>
      </defs>
      <rect x="12" y="0" width="22" height="16" rx="3" fill="url(#wl-clip-metal)" />
      <path d="M23 12c-10 0-15 6-15 14v14h8V26c0-4 3-6 7-6s7 2 7 6v14h8V26c0-8-5-14-15-14Z" fill="url(#wl-clip-metal)" />
      <rect x="14" y="40" width="18" height="30" rx="5" fill="url(#wl-clip-metal)" />
      <rect x="19" y="46" width="8" height="12" rx="3" fill="#1b1822" />
    </svg>
  );
}

/** One side of the pass. Both sides share the material: gradient, grain, cursor sheen and the lanyard slot. */
function Face({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement> & { inert?: boolean }) {
  return (
    <div
      {...props}
      className={`group relative flex min-h-[600px] flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,var(--wl-surface-1),var(--wl-surface-2)_65%)] p-6 shadow-[inset_0_1px_1px_#ffffff2e,inset_0_0_0_1px_#ffffff10,0_40px_80px_-24px_#000000b0] [backface-visibility:hidden] [grid-area:1/1] min-[400px]:p-8 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light" style={{ backgroundImage: GRAIN, backgroundSize: "160px" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-[radial-gradient(ellipse_80%_90%_at_50%_0%,#7852A94d,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 30%), #d9b3ff26, transparent 70%)" }}
      />
      <div aria-hidden="true" className="absolute left-1/2 top-[15px] h-[9px] w-[30px] -translate-x-1/2 rounded-full bg-[var(--wl-bg)] shadow-[inset_0_2px_2px_#0008,0_1px_0_#ffffff20]" />
      {children}
    </div>
  );
}

function Identity({ label }: { label: string }) {
  return (
    <div className="relative flex items-center justify-between pt-3 text-white/75">
      <span className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</span>
      <span className="font-serif text-base text-[var(--wl-accent-soft)]">Estelle</span>
    </div>
  );
}

const WaitlistPass = () => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("form");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [country, setCountry] = useState<Country>();
  const [pickerOpen, setPickerOpen] = useState(false);
  // "" while drawing, null if the avatar could not be drawn.
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");
  const [pass, setPass] = useState<Pass>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const busy = phase === "saving";
  const joined = phase === "joined";
  const firstName = name.trim().split(/\s+/)[0];

  // Pendulum: x/y are the card's offset from rest, anchor is the strap's fixed point (stage coordinates).
  const x = useMotionValue(0);
  const y = useMotionValue(-280);
  const anchor = useMotionValue(-460);
  const vx = useVelocity(x);
  const rotate = useSpring(
    useTransform(() => {
      const hang = (-Math.atan2(x.get(), y.get() - CLIP_DROP - anchor.get()) * 180) / Math.PI;
      const lag = Math.max(-10, Math.min(10, vx.get() * 0.012));
      return Math.max(-35, Math.min(35, hang + lag));
    }),
    { stiffness: 260, damping: 24 }
  );
  const dragControls = useDragControls();

  useEffect(() => {
    const measure = () => {
      if (stage.current) anchor.set(-(stage.current.getBoundingClientRect().top + window.scrollY + 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [anchor]);

  // Drop in on arrival and settle with a small sway; reduced motion just hangs still.
  useEffect(() => {
    if (reduce) {
      x.set(0);
      y.set(0);
      return;
    }
    const drop = animate(y, 0, { type: "spring", stiffness: 70, damping: 8 });
    const sway = animate(x, 0, { ...SWING, velocity: 180 });
    return () => {
      drop.stop();
      sway.stop();
    };
  }, [reduce, x, y]);

  useEffect(() => {
    if (!joined) return;
    heading.current?.focus({ preventScroll: true });
    if (!reduce) animate(x, 0, { ...SWING, velocity: 520 });
  }, [joined, reduce, x]);

  // Drawn as soon as the pass is joined and its avatar is ready, so the share sheet opens inside the tap that asks for it.
  useEffect(() => {
    // The joined face: the heading's parent.
    const face = heading.current?.parentElement;
    if (!joined || avatarUrl === "" || !face || !heading.current) return;
    let cancelled = false;
    const serif = face.querySelector(".font-serif") ?? face;
    renderPassImage({
      greeting: firstName ? `HEY, ${firstName.toUpperCase()}` : "YOUR LEGACY BEGINS",
      from: country ? `from ${country.name} ${country.flag}` : "",
      avatarUrl: avatarUrl ?? "",
      fonts: { display: getComputedStyle(heading.current).fontFamily, body: getComputedStyle(face).fontFamily, serif: getComputedStyle(serif).fontFamily },
      site: window.location.host,
    })
      .then((blob) => {
        if (cancelled) return;
        const file = new File([blob], "estelle-waitlist-pass.png", { type: "image/png" });
        // Phones get the share sheet (Instagram, WhatsApp, X…); desktop share menus lack those apps, so computers save it.
        const touch = window.matchMedia("(pointer: coarse)").matches;
        setPass({ file, shareable: touch && navigator.canShare?.({ files: [file] }) === true });
      })
      .catch(() => { if (!cancelled) setPass("failed"); });
    return () => { cancelled = true; };
  }, [joined, avatarUrl, country, firstName]);

  async function sharePass() {
    if (!pass || pass === "failed") return;
    if (pass.shareable) {
      const from = country ? ` from ${country.name} ${country.flag}` : "";
      try {
        await navigator.share({ files: [pass.file], title: "Estelle waitlist", text: `I have joined Estelle waitlist${from}. Join me: ${window.location.origin}/waitlist` });
        return;
      } catch (shareError) {
        if (shareError instanceof DOMException && shareError.name === "AbortError") return;
      }
    }
    download(pass.file);
  }

  const closePicker = useCallback((returnFocus: boolean) => {
    setPickerOpen(false);
    if (returnFocus) document.getElementById("wl-country")?.focus();
  }, []);

  function pickCountry(next: Country) {
    setCountry(next);
    setErrors((prev) => (prev.country ? { ...prev, country: "" } : prev));
    closePicker(true);
  }

  function startDrag(e: React.PointerEvent) {
    if (reduce || (e.target as HTMLElement).closest("input, button, a, label, [data-no-drag]")) return;
    dragControls.start(e);
  }

  function release(_: PointerEvent, info: PanInfo) {
    animate(x, 0, { ...SWING, velocity: info.velocity.x });
    animate(y, 0, { ...SWING, velocity: info.velocity.y });
  }

  function trackSheen(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const field = e.currentTarget.name as FieldName;
    const value = e.currentTarget.value.trim();
    if (!value && !errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: VALIDATE[field](value) }));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const field = e.currentTarget.name as FieldName;
    const value = e.currentTarget.value.trim();
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: VALIDATE[field](value) }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next = Object.fromEntries(FIELDS.map((f) => [f.name, VALIDATE[f.name](String(data[f.name] ?? "").trim())]));
    setErrors(next);
    const firstInvalid = FIELDS.find((f) => next[f.name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#wl-${firstInvalid.name}`)?.focus();
      return;
    }

    setPhase("saving");
    setSubmitError("");
    setName(data.name);
    if (avatarUrl === "") {
      loadAvatarModules()
        .then(([{ createAvatar }, micah]) => setAvatarUrl(createAvatar(micah, {
          // Random, not name-based.
          seed: Math.random().toString(36).slice(2, 10),
          size: 288,
          backgroundColor: ["c0aede", "ffd5dc", "b6e3f4", "ffdfbf", "c7f0d8"],
          mouth: ["smile", "laughing", "smirk"],
        }).toDataUri()))
        .catch(() => setAvatarUrl(null));
    }
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? FAILURE);
      }
      setPhase("joined");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : FAILURE);
      setPhase("form");
    }
  }

  return (
    <div className="relative isolate grid min-h-[max(780px,100svh)] place-items-center px-5 pb-12 pt-[max(110px,17svh)]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[min(950px,110svh)] w-[min(1060px,200vw)] -translate-x-1/2 -translate-y-[45%] bg-[radial-gradient(ellipse_30%_42%_at_26%_35%,#7852A955,transparent_95%),radial-gradient(ellipse_30%_42%_at_75%_65%,#a984dd40,transparent_95%)]"
      />

      <div ref={stage} className="relative w-[min(386px,calc(100vw-40px))]">
        <Strap x={x} y={y} anchor={anchor} />
        <motion.article
          aria-label={joined ? "Your Estelle waitlist pass" : "Estelle early access pass"}
          aria-busy={busy}
          drag={!reduce}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onDragEnd={release}
          onPointerDown={startDrag}
          onPointerMove={trackSheen}
          style={{ x, y, rotate, transformOrigin: `50% -${CLIP_DROP}px`, touchAction: "pan-y" }}
          className="relative cursor-grab select-none [perspective:1600px] active:cursor-grabbing"
        >
          <Clip />
          <motion.div
            className="grid [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: joined ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 13 }}
          >
            <Face aria-hidden={joined} inert={joined}>
              <Identity label="Early access" />
              <h1 className="relative mt-8 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
                Turn your story into a legacy brand.
              </h1>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                Get early access to Estelle&apos;s personal branding courses.
              </p>

              <form
                noValidate
                onSubmit={onSubmit}
                onFocus={() => void loadAvatarModules().catch(() => {})}
                aria-label="Join the Estelle waitlist"
                inert={busy}
                className={`relative mt-6 flex flex-1 flex-col transition-opacity duration-200 ${busy ? "opacity-50" : ""}`}
              >
                <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                  {FIELDS.map((f) => {
                    const error = errors[f.name];
                    return (
                      <div key={f.name} className={f.half ? "col-span-2 min-[360px]:col-span-1" : "col-span-2"}>
                        <label htmlFor={`wl-${f.name}`} className="mb-2 block cursor-default text-[13px] font-medium text-white/85">
                          {f.label}
                        </label>
                        {f.type === "select" ? (
                          <>
                            {/* Opens CountrySheet; the hidden input carries the name to the signup, like the old text field. */}
                            <button
                              type="button"
                              id={`wl-${f.name}`}
                              aria-haspopup="dialog"
                              aria-expanded={pickerOpen}
                              aria-invalid={!!error}
                              aria-describedby={error ? `wl-${f.name}-error` : undefined}
                              onClick={() => setPickerOpen(true)}
                              className={`${inputClass} flex cursor-pointer items-center gap-2 text-left ${country ? "" : "text-white/45"}`}
                            >
                              {country && <span aria-hidden="true" className="text-lg leading-none">{country.flag}</span>}
                              <span className="min-w-0 flex-1 truncate">{country?.name ?? f.placeholder}</span>
                              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-white/55" />
                            </button>
                            <input type="hidden" name={f.name} value={country?.name ?? ""} />
                          </>
                        ) : (
                          <input
                            id={`wl-${f.name}`}
                            name={f.name}
                            type={f.type}
                            autoComplete={f.autoComplete}
                            inputMode={f.inputMode}
                            placeholder={f.placeholder}
                            maxLength={f.maxLength}
                            required
                            aria-invalid={!!error}
                            aria-describedby={error ? `wl-${f.name}-error` : undefined}
                            onBlur={onBlur}
                            onChange={onChange}
                            className={inputClass}
                          />
                        )}
                        {error && (
                          <p id={`wl-${f.name}-error`} className="mt-1.5 text-xs leading-snug text-[var(--wl-error)]">
                            {error}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div aria-hidden="true" className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]">
                  <label>
                    Leave this empty
                    <input name="website" type="text" autoComplete="off" tabIndex={-1} />
                  </label>
                </div>

                <div className="mt-auto pt-6">
                  <motion.button
                    type="submit"
                    disabled={busy}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[linear-gradient(180deg,#ffffff,#e9deff)] text-[15px] font-semibold text-[#2a1d45] shadow-[0_8px_24px_-8px_#d9b3ff80] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wl-accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy ? "Saving your spot…" : "Join waitlist"}
                    <MoveRight className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                  {submitError ? (
                    <p role="alert" className="mt-3 text-center text-xs leading-relaxed text-[var(--wl-error)]">
                      {submitError}
                    </p>
                  ) : (
                    <p className="mt-3 text-center text-xs leading-relaxed text-white/60">Free to join. One email when we launch.</p>
                  )}
                </div>
              </form>
              <CountrySheet open={pickerOpen && !joined} selected={country} onPick={pickCountry} onClose={closePicker} />
            </Face>

            <Face aria-hidden={!joined} inert={!joined} className="[transform:rotateY(180deg)]">
              <Identity label="Founding member" />
              <h2 ref={heading} tabIndex={-1} className="relative mt-8 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white outline-none">
                I have joined
                <br />
                Estelle waitlist
                {country && <span className="block text-[var(--wl-accent-soft)]">from {country.name} {country.flag}</span>}
              </h2>
              <div className="relative grid flex-1 place-items-center py-8">
                <div className="rounded-full bg-[radial-gradient(circle_at_30%_25%,var(--wl-accent-soft),var(--wl-accent)_60%,#4b2f78)] p-1.5 shadow-[inset_0_2px_4px_#ffffff55,0_20px_50px_-10px_#7852A9aa]">
                  {avatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element -- generated SVG data URI; next/image adds nothing here
                    <img
                      src={avatarUrl}
                      alt="Your Estelle avatar"
                      width={144}
                      height={144}
                      className="h-36 w-36 rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="relative">
                <span className="block truncate text-xs font-semibold tracking-[0.12em] text-white/65" title={name.trim()}>
                  {firstName ? `HEY, ${firstName.toUpperCase()}` : "YOUR LEGACY BEGINS"}
                </span>
                <strong className="mt-2 block font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
                  Your story.
                  <br />
                  Our mission.
                </strong>
                <p className="mt-3 text-sm text-white/70">We&apos;ll email you the moment we open the doors.</p>
                <div className="mt-5 grid grid-cols-2 gap-2 max-[389px]:grid-cols-1">
                  {pass !== "failed" && (
                    <button
                      type="button"
                      onClick={sharePass}
                      disabled={!pass}
                      aria-busy={!pass}
                      className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffffff,#e9deff)] px-3 text-[13px] font-semibold text-[#2a1d45] shadow-[0_8px_24px_-8px_#d9b3ff80] transition-[opacity,transform] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wl-accent-soft)] active:scale-[.97] disabled:cursor-wait disabled:opacity-60"
                    >
                      {pass && !pass.shareable ? <>Save pass<Download className="h-4 w-4" aria-hidden="true" /></> : <>Share pass<Share className="h-4 w-4" aria-hidden="true" /></>}
                    </button>
                  )}
                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-3 text-[13px] font-semibold text-white shadow-[inset_0_0_0_1px_#ffffff14] transition-[background-color,transform] hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wl-accent-soft)] active:scale-[.97]"
                  >
                    Join the group<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </Face>
          </motion.div>
        </motion.article>
      </div>

      <p className="sr-only" role="status">
        {busy ? "Saving your spot…" : joined ? "You have joined Estelle waitlist." : ""}
      </p>
    </div>
  );
};

export default WaitlistPass;
