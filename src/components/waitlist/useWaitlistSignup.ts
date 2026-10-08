"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

export type WaitlistPhase = "form" | "saving" | "revealing" | "joined";
const FAILURE = "We couldn’t save your spot. Please try again.";
const PIXEL_BEAT_MS = 800;
const AVATAR_FALLBACK_MS = 900;

/** Durable signup first; a short, bounded visual bridge never decides whether it succeeded. */
export function useWaitlistSignup() {
  const [phase, setPhase] = useState<WaitlistPhase>("form");
  const [error, setError] = useState("");
  const livePhase = useRef<WaitlistPhase>("form");
  const mounted = useRef(true);
  const pending = useRef(false);
  const request = useRef<AbortController | null>(null);
  const requestTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const submittedAt = useRef(0);
  const savedAt = useRef(0);
  const avatarReady = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current?.abort();
      clearTimeout(requestTimer.current);
      clearTimeout(revealTimer.current);
    };
  }, []);

  const updatePhase = useCallback((next: WaitlistPhase) => {
    livePhase.current = next;
    setPhase(next);
  }, []);

  const scheduleReveal = useCallback(() => {
    if (!mounted.current || livePhase.current !== "revealing") return;
    clearTimeout(revealTimer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const earliest = submittedAt.current + PIXEL_BEAT_MS;
    const deadline = avatarReady.current ? earliest : Math.max(earliest, savedAt.current + AVATAR_FALLBACK_MS);
    revealTimer.current = setTimeout(() => {
      if (mounted.current && livePhase.current === "revealing") updatePhase("joined");
    }, reduced ? 0 : Math.max(0, deadline - Date.now()));
  }, [updatePhase]);

  const onAvatarReady = useCallback(() => {
    avatarReady.current = true;
    scheduleReveal();
  }, [scheduleReveal]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current || livePhase.current !== "form") return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const controller = new AbortController();
    request.current = controller;
    requestTimer.current = setTimeout(() => controller.abort(), 12000);
    pending.current = true;
    submittedAt.current = Date.now();
    setError("");
    updatePhase("saving");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST", headers: { "content-type": "application/json" }, signal: controller.signal,
        body: JSON.stringify(values),
      });
      const result: unknown = await response.json();
      if (!mounted.current) return;
      if (response.ok && result !== null && typeof result === "object" && "ok" in result && result.ok === true) {
        savedAt.current = Date.now();
        updatePhase("revealing");
        scheduleReveal();
      } else {
        setError(result !== null && typeof result === "object" && "error" in result && typeof result.error === "string" ? result.error : FAILURE);
        updatePhase("form");
      }
    } catch {
      if (mounted.current) { setError(FAILURE); updatePhase("form"); }
    } finally {
      clearTimeout(requestTimer.current);
      request.current = null;
      pending.current = false;
    }
  };

  return { phase, error, submit, onAvatarReady };
}
