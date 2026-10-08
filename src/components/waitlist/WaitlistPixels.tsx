"use client";

import { useEffect, useRef } from "react";

// Kaiyros's skeleton lattice (img-fx `pixels-organic` at 0.7 scale): about 31.8 cells per 320px edge.
const CELLS_PER_320 = (6 + 0.22 * 74) / 0.7;
// Mostly the pass surface, with sparse soft cells and rare muted highlights: surface → soft → muted.
const LEVELS = [[44, 41, 38], [60, 56, 52], [82, 77, 70], [106, 100, 91]];
const STEPS = [.52, .63, .74];

function hash(x: number, y: number, z: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const ease = (t: number) => t * t * (3 - 2 * t);
  const u = ease(x - xi), v = ease(y - yi), w = ease(z - zi);
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;
  const plane = (dz: number) => mix(
    mix(hash(xi, yi, zi + dz), hash(xi + 1, yi, zi + dz), u),
    mix(hash(xi, yi + 1, zi + dz), hash(xi + 1, yi + 1, zi + dz), u),
    v,
  );
  return mix(plane(0), plane(1), w);
}

/** A drifting field of neutral pixels while the signup saves. One canvas pixel per cell, scaled up crisp. */
export function WaitlistPixels() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = canvas.current;
    const context = node?.getContext("2d");
    if (!node || !context || window.matchMedia("(prefers-reduced-motion: reduce), (forced-colors: active)").matches) return;
    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const box = node.getBoundingClientRect();
      const columns = Math.max(2, Math.floor(CELLS_PER_320 * box.width / 320));
      const rows = Math.max(2, Math.floor(CELLS_PER_320 * box.height / 320));
      if (node.width !== columns || node.height !== rows) { node.width = columns; node.height = rows; }
      const field = context.createImageData(columns, rows);
      const t = (now - start) / 1000;
      for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
        const value = .6 * noise(column * .38, row * .38, t * .7) + .4 * noise(column * .9 + 11, row * .9 + 7, t * 1.1);
        const level = LEVELS[STEPS.filter(step => value > step).length];
        const i = (row * columns + column) * 4;
        field.data[i] = level[0]; field.data[i + 1] = level[1]; field.data[i + 2] = level[2]; field.data[i + 3] = 255;
      }
      context.putImageData(field, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <span className="waitlist-pixels" aria-hidden="true"><canvas ref={canvas} /></span>;
}
