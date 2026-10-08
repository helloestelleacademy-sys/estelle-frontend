"use client";

import { useEffect, useRef, useState } from "react";

type Device = "desktop" | "phone";
type Design = { key: string; src: string; label: string; note: string; field: string };

const SIZES: Record<Device, { width: number; height: number }> = {
  desktop: { width: 1280, height: 800 },
  phone: { width: 390, height: 844 },
};
const DESIGNS: Design[] = [
  { key: "before", src: "/waitlist/before", label: "Before", note: "As it was in git before the redesign", field: "#wl-" },
  { key: "after", src: "/waitlist", label: "After", note: "Kaiyros design with Estelle copy", field: "#waitlist-" },
];
const SAMPLE = { name: "Ada Lovelace", email: "ada@example.com", phone: "+234 801 234 5678", country: "Nigeria" };
// Toolbar, captions and padding around each frame.
const CHROME_HEIGHT = 170;

type FrameWindow = Window & typeof globalThis & { __signupsSimulated?: boolean };

/** Same-origin frames: answer the signup call here, so trying either form never reaches Tally. */
function simulateSignups(frame: HTMLIFrameElement | null) {
  const win = frame?.contentWindow as FrameWindow | null | undefined;
  if (!win || win.__signupsSimulated) return;
  const realFetch = win.fetch.bind(win);
  win.fetch = (input, init) => {
    const url = typeof input === "string" ? input : "url" in input ? input.url : input.href;
    if (url.endsWith("/api/waitlist") && init?.method?.toUpperCase() === "POST") {
      return new Promise(resolve => setTimeout(() => resolve(new win.Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } })), 600));
    }
    return realFetch(input, init);
  };
  win.__signupsSimulated = true;
}

function submitSample(frame: HTMLIFrameElement | null, field: string) {
  const win = frame?.contentWindow as FrameWindow | null | undefined;
  const doc = frame?.contentDocument;
  const setValue = win && Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value")?.set;
  if (!win || !doc || !setValue) return;
  simulateSignups(frame);
  for (const [name, value] of Object.entries(SAMPLE)) {
    const input = doc.querySelector<HTMLInputElement>(`${field}${name}`);
    if (!input) continue;
    setValue.call(input, value);
    input.dispatchEvent(new win.Event("input", { bubbles: true }));
  }
  doc.querySelector("form")?.requestSubmit();
}

function Pane({ design, device, run, frameRef }: { design: Design; device: Device; run: number; frameRef: (node: HTMLIFrameElement | null) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const { width, height } = SIZES[device];

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const fit = () => setScale(Math.min(1, node.clientWidth / width, Math.max(240, window.innerHeight - CHROME_HEIGHT) / height));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    window.addEventListener("resize", fit);
    return () => { observer.disconnect(); window.removeEventListener("resize", fit); };
  }, [width, height]);

  return <section aria-labelledby={`${design.key}-label`} className="min-w-0">
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <div className="min-w-0">
        <h2 id={`${design.key}-label`} className="text-sm font-semibold tracking-[-0.01em]">{design.label}</h2>
        <p className="truncate text-xs text-[#a49d94]">{design.note}</p>
      </div>
      <a href={design.src} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded text-xs text-[#a49d94] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b18aff]">
        Open full page<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
    <div ref={box} className="w-full">
      <div className="relative mx-auto overflow-hidden rounded-[14px] bg-black shadow-[0_0_0_1px_#ffffff14]" style={{ width: width * scale, height: height * scale }}>
        {scale > 0 && <iframe
          key={run}
          ref={frameRef}
          src={design.src}
          title={`${design.label}: ${design.note}`}
          width={width}
          height={height}
          onLoad={event => simulateSignups(event.currentTarget)}
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{ transform: `scale(${scale})` }}
        />}
      </div>
    </div>
  </section>;
}

export default function WaitlistCompare() {
  const [device, setDevice] = useState<Device>("desktop");
  const [run, setRun] = useState(0);
  const frames = useRef<Record<string, HTMLIFrameElement | null>>({});

  return <div className="min-h-svh bg-[#131211] text-[#fcfcfc] [color-scheme:dark]">
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-white/[0.06] bg-[#131211]/90 px-6 py-4 backdrop-blur-md">
      <div>
        <h1 className="text-[15px] font-semibold tracking-[-0.01em]">Waitlist: before and after</h1>
        <p className="text-xs text-[#a49d94]">Try both. Signups on this page are simulated, so nothing reaches Tally.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Screen size" className="flex rounded-full bg-white/[0.06] p-1">
          {(["desktop", "phone"] as const).map(option => <button
            key={option}
            type="button"
            aria-pressed={device === option}
            onClick={() => setDevice(option)}
            className="min-h-8 cursor-pointer rounded-full px-4 text-[13px] text-[#a49d94] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b18aff] aria-pressed:bg-white/[0.12] aria-pressed:text-white"
          >
            {option === "desktop" ? "Desktop" : "Phone"}
          </button>)}
        </div>
        <button
          type="button"
          onClick={() => DESIGNS.forEach(design => submitSample(frames.current[design.key], design.field))}
          className="min-h-10 cursor-pointer rounded-full bg-[#f3f2f0] px-4 text-[13px] font-medium text-[#131211] transition-[background-color,transform] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b18aff] active:scale-[.98]"
        >
          Preview joined state
        </button>
        <button
          type="button"
          onClick={() => setRun(count => count + 1)}
          className="min-h-10 cursor-pointer rounded-full px-4 text-[13px] text-[#a49d94] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b18aff]"
        >
          Reset
        </button>
      </div>
    </header>
    <main className="grid gap-x-6 gap-y-10 p-6 lg:grid-cols-2">
      {DESIGNS.map(design => <Pane
        key={design.key}
        design={design}
        device={device}
        run={run}
        frameRef={node => { frames.current[design.key] = node; }}
      />)}
    </main>
  </div>;
}
