/** Violet light, as RGB, shared by the page backdrop and the share image. */
export const DITHER_LIGHT_RGB = [160, 131, 198] as const;

function passEdgeFade(value: number) {
  const t = Math.max(0, Math.min(1, (1 - Math.abs(value)) / .24));
  return t * t * (3 - 2 * t);
}

/** Stochastic tonal quantization: coverage varies, rather than blurring a noise overlay. */
export function ditherCoverage(intensity: number, x: number, y: number) {
  let seed = Math.imul(x + 1, 374761393) ^ Math.imul(y + 1, 668265263);
  seed = Math.imul(seed ^ (seed >>> 13), 1274126177);
  const threshold = ((seed ^ (seed >>> 16)) >>> 0) / 4294967296;
  const levels = Math.max(0, Math.min(1, intensity)) * 31;
  return Math.round((Math.floor(levels) + (threshold < levels % 1 ? 1 : 0)) * 255 / 31);
}

/** Two soft asymmetric shoulders light the pass without filling the page. x and y run -1..1. */
export function lightIntensity(x: number, y: number) {
  const edge = Math.exp(-Math.pow(x, 4) * 3.8 - Math.pow(y, 4) * 2.4);
  const left = .4 * Math.exp(-((x + .48) ** 2 / .14 + (y + .3) ** 2 / .4));
  const right = .33 * Math.exp(-((x - .5) ** 2 / .14 + (y - .3) ** 2 / .35));
  return edge * passEdgeFade(x) * passEdgeFade(y) * (left + right);
}
