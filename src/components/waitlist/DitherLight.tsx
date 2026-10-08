"use client";

import { useEffect, useRef, useState } from "react";
import { DITHER_LIGHT_RGB, ditherCoverage, lightIntensity } from "@/lib/dither-light";

type LightPaint = { width: number; height: number; row: number; field: ImageData };

/** Still, pixel-resolved light. Small cancellable row batches keep the scene responsive. */
export function DitherLight({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = canvas.current;
    const context = node?.getContext("2d");
    if (!node || !context) return;
    let near = false, pending = 0;
    let job: LightPaint | null = null;
    const cancel = () => { cancelAnimationFrame(pending); pending = 0; job = null; };
    const paint = () => {
      pending = 0;
      if (!near || document.visibilityState !== "visible") { job = null; return; }
      const bounds = node.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) { job = null; return; }
      const ratio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(2200000 / (bounds.width * bounds.height)));
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      if (node.width === width && node.height === height && node.dataset.painted === "true") { job = null; return; }
      if (!job || job.width !== width || job.height !== height) job = { width, height, row: 0, field: context.createImageData(width, height) };
      const deadline = performance.now() + 4;
      // Commit only a complete field. On resize, the previous light stays visible
      // until its replacement is ready; cancellation never exposes half an image.
      do {
        const y = job.row;
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          job.field.data[i] = DITHER_LIGHT_RGB[0]; job.field.data[i + 1] = DITHER_LIGHT_RGB[1]; job.field.data[i + 2] = DITHER_LIGHT_RGB[2];
          job.field.data[i + 3] = ditherCoverage(lightIntensity(x / width * 2 - 1, y / height * 2 - 1), x, y);
        }
        job.row++;
      } while (job.row < height && performance.now() < deadline);
      if (job.row < height) { pending = requestAnimationFrame(paint); return; }
      node.width = width; node.height = height;
      context.putImageData(job.field, 0, 0);
      node.dataset.painted = "true";
      job = null;
      setReady(true);
    };
    const schedule = () => { if (!pending && near && document.visibilityState === "visible") pending = requestAnimationFrame(paint); };
    const visibility = () => { if (document.visibilityState === "visible") schedule(); else cancel(); };
    const intersection = new IntersectionObserver(entries => { near = entries[0]?.isIntersecting === true; if (near) schedule(); else cancel(); }, { rootMargin: "200px" });
    const resize = new ResizeObserver(schedule);
    intersection.observe(node); resize.observe(node);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("resize", schedule);
    return () => {
      intersection.disconnect(); resize.disconnect(); cancel();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <div className={`dither-light ${className}`} data-ready={ready} aria-hidden="true"><canvas ref={canvas} /></div>;
}
