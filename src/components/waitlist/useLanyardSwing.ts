"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { animate, useMotionValue, useSpring, useTransform } from "framer-motion";

// A stiff strap: lanyard and pass swing together from a pivot above the screen (period ~1s, a few
// decaying swings), and the pass trails on its hook. Positive angles are clockwise.
const SWING = { type: "spring", stiffness: 36, damping: 2.4 } as const;
const LIMIT = 18;
const MAX_SPIN = 120;
const INTERACTIVE = "input, button, a, label, select, textarea";
const degrees = (radians: number) => radians * 180 / Math.PI;
// Past the limit the strap resists, rather than stopping dead.
const resist = (angle: number) => Math.abs(angle) <= LIMIT ? angle : Math.sign(angle) * (LIMIT + (Math.abs(angle) - LIMIT) * .25);

type Drag = { id: number; startX: number; startAngle: number; length: number; lastX: number; lastT: number; vx: number };

export function useLanyardSwing(reduce: boolean, joined: boolean) {
  const angle = useMotionValue(0);
  const cardAngle = useSpring(useTransform(angle, value => value * .5), { stiffness: 120, damping: 8 });
  const cardLag = useTransform(() => cardAngle.get() - angle.get());
  const drag = useRef<Drag | null>(null);

  // A soft sway as it arrives; the drop itself is CSS so it plays before hydration.
  useEffect(() => {
    if (reduce) return;
    const sway = animate(angle, 0, { ...SWING, velocity: 10 });
    return () => sway.stop();
  }, [reduce, angle]);

  useEffect(() => {
    if (joined && !reduce) animate(angle, 0, { ...SWING, velocity: -22 });
  }, [joined, reduce, angle]);

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (reduce || event.button !== 0 || (event.target as Element).closest(INTERACTIVE)) return;
    const stage = event.currentTarget;
    const hanger = stage.querySelector<HTMLElement>(".waitlist-badge-hanger");
    const pivotY = stage.getBoundingClientRect().top + 30 - (hanger?.offsetHeight ?? 400);
    angle.stop();
    stage.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId, startX: event.clientX, startAngle: angle.get(),
      length: Math.max(200, event.clientY - pivotY), lastX: event.clientX, lastT: event.timeStamp, vx: 0,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dt = Math.max(1, event.timeStamp - current.lastT);
    current.vx = .8 * ((event.clientX - current.lastX) / dt * 1000) + .2 * current.vx;
    current.lastX = event.clientX;
    current.lastT = event.timeStamp;
    // Moving the pass right swings the strap anticlockwise about the pivot.
    angle.set(resist(current.startAngle - degrees(Math.atan2(event.clientX - current.startX, current.length))));
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    drag.current = null;
    // A pause before letting go is a drop, not a throw.
    const vx = event.timeStamp - current.lastT > 80 ? 0 : current.vx;
    const spin = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, -degrees(vx / current.length)));
    animate(angle, 0, { ...SWING, velocity: spin });
  }

  return { angle, cardLag, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp } };
}
