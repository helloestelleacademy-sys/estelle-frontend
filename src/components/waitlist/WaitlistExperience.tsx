"use client";
/* eslint-disable @next/next/no-img-element -- fixed-size art and a generated SVG avatar, sized by CSS */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DitherLight } from "./DitherLight";
import { renderPassImage } from "./passImage";
import { useLanyardSwing } from "./useLanyardSwing";
import { useWaitlistSignup } from "./useWaitlistSignup";
import { WaitlistPixels } from "./WaitlistPixels";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/HsGoAAg3ww9LQ0NIs0Sy69?mode=gi_t";
const SHARE_TEXT = "I have joined the Estelle waitlist.";
// Generated on the device: instant, offline, and no third-party request. Prewarmed on form focus.
let avatarModules: Promise<[typeof import("@dicebear/core"), typeof import("@dicebear/micah")]> | undefined;
function loadAvatarModules() {
  avatarModules ??= Promise.all([import("@dicebear/core"), import("@dicebear/micah")]);
  avatarModules.catch(() => { avatarModules = undefined; });
  return avatarModules;
}

type Pass = { file: File; shareable: boolean } | "failed" | null;

function Icon({ path }: { path: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}
const ARROW = "M4 12h16M14 6l6 6-6 6";
const SHARE = "M12 16V3m-5 5 5-5 5 5M4 15v5h16v-5";
const SAVE = "M12 3v13m-5-5 5 5 5-5M4 15v5h16v-5";

/** WhatsApp glyph, Simple Icons (CC0). */
function WhatsAppIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
}

function download(file: File) {
  const href = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = href;
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export default function WaitlistExperience() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [pass, setPass] = useState<Pass>(null);
  const { phase, error, submit, onAvatarReady } = useWaitlistSignup();
  const reduce = useReducedMotion();
  const scene = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);
  const busy = phase === "saving" || phase === "revealing";
  const saved = phase === "revealing" || phase === "joined";
  const joined = phase === "joined";
  const swing = useLanyardSwing(reduce === true, joined);
  const holder = name.trim();

  useEffect(() => { if (joined) heading.current?.focus({ preventScroll: true }); }, [joined]);
  useEffect(() => { if (error) submitButton.current?.focus({ preventScroll: true }); }, [error]);

  // Drawn as soon as the pass is joined, so the share sheet can open inside the tap that asks for it.
  useEffect(() => {
    if (!joined || !scene.current) return;
    let cancelled = false;
    renderPassImage({ holder, avatarUrl, fontFamily: getComputedStyle(scene.current).fontFamily, site: window.location.host })
      .then(blob => {
        if (cancelled) return;
        const file = new File([blob], "estelle-waitlist-pass.png", { type: "image/png" });
        // Phones get the share sheet (Instagram, WhatsApp, X…); desktop share menus lack those apps, so computers download.
        const touch = window.matchMedia("(pointer: coarse)").matches;
        setPass({ file, shareable: touch && navigator.canShare?.({ files: [file] }) === true });
      })
      .catch(() => { if (!cancelled) setPass("failed"); });
    return () => { cancelled = true; };
  }, [joined, holder, avatarUrl]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!avatarUrl) {
      loadAvatarModules()
        .then(([{ createAvatar }, micah]) => setAvatarUrl(createAvatar(micah, {
          seed: Math.random().toString(36).slice(2, 10),
          size: 512,
          backgroundColor: ["c0aede", "ffd5dc", "b6e3f4", "ffdfbf", "c7f0d8"],
          mouth: ["smile", "laughing", "smirk"],
        }).toDataUri()))
        .catch(onAvatarReady);
    }
    void submit(event);
  }

  async function sharePass() {
    if (!pass || pass === "failed") return;
    if (pass.shareable) {
      try {
        await navigator.share({ files: [pass.file], title: "Estelle waitlist", text: `${SHARE_TEXT} Join me: ${window.location.origin}/waitlist` });
        return;
      } catch (shareError) {
        if (shareError instanceof DOMException && shareError.name === "AbortError") return;
      }
    }
    download(pass.file);
  }

  return <div ref={scene} className="waitlist-scene" data-phase={phase}>
    <DitherLight className="waitlist-light" />
    <motion.div layout="position" transition={{ layout: reduce ? { duration: 0 } : { duration: .45, ease: [.22, 1, .36, 1] } }} className="waitlist-column">
      <motion.div className="waitlist-badge-stage" style={{ rotate: swing.angle }} {...swing.handlers}>
        <div className="waitlist-badge-hanger" aria-hidden="true"><img src="/art/waitlist/lanyard-estelle.webp" alt="" width="172" height="1110" fetchPriority="high" draggable="false" /></div>
        <motion.article className="waitlist-badge" style={{ rotate: swing.cardLag }} aria-label={joined ? "Your Estelle waitlist pass" : "Estelle early access pass"} aria-busy={busy}>
          <div className="waitlist-card-art" aria-hidden="true"><img src="/art/waitlist/foil-relief.webp" alt="" width="1000" height="1000" fetchPriority="high" draggable="false" /></div>
          <div className="waitlist-badge-slot" aria-hidden="true" />
          <div className="waitlist-badge-identity"><span>Founding member</span><span>Estelle</span></div>
          <div className="waitlist-badge-caption">
            <h1 ref={heading} tabIndex={-1}>{joined ? <>I have joined the<br />Estelle waitlist.</> : "Build your legacy."}</h1>
          </div>
          <div className="waitlist-badge-content">
            {!saved && <form className="waitlist-form" onSubmit={onSubmit} onFocus={() => void loadAvatarModules().catch(() => {})} aria-label="Join the Estelle waitlist" aria-hidden={busy} inert={busy} data-hidden={busy}>
              <div className="waitlist-field">
                <label htmlFor="waitlist-name">Your name</label>
                <input id="waitlist-name" name="name" autoComplete="name" maxLength={80} required disabled={busy} placeholder="Your full name" value={name} onChange={event => setName(event.target.value)} />
              </div>
              <div className="waitlist-field">
                <label htmlFor="waitlist-email">Email</label>
                <input id="waitlist-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required disabled={busy} placeholder="you@example.com" aria-describedby={error ? "waitlist-error" : "waitlist-note"} />
              </div>
              <div className="waitlist-field-row">
                <div className="waitlist-field">
                  <label htmlFor="waitlist-phone">Phone</label>
                  <input id="waitlist-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={30} required disabled={busy} placeholder="+234 801" />
                </div>
                <div className="waitlist-field">
                  <label htmlFor="waitlist-country">Country</label>
                  <input id="waitlist-country" name="country" autoComplete="country-name" maxLength={60} required disabled={busy} placeholder="Nigeria" />
                </div>
              </div>
              <div className="waitlist-honeypot" aria-hidden="true"><label htmlFor="waitlist-website">Leave this empty</label><input id="waitlist-website" name="website" autoComplete="off" tabIndex={-1} /></div>
              <div className="waitlist-form-actions">
                <button ref={submitButton} className="material-button white waitlist-submit" type="submit" disabled={busy}>Join waitlist<Icon path={ARROW} /></button>
                {error
                  ? <p id="waitlist-error" className="waitlist-form-note waitlist-error" role="alert">{error}</p>
                  : <p id="waitlist-note" className="waitlist-form-note">Free to join. One email when we launch.</p>}
              </div>
            </form>}
            {saved && <div className="waitlist-companion" aria-hidden={!joined} inert={!joined} data-visible={joined}>
              <span className="waitlist-avatar">{avatarUrl && <img src={avatarUrl} alt="Your Estelle avatar" width="170" height="170" onLoad={onAvatarReady} onError={onAvatarReady} />}</span>
            </div>}
            {busy && <WaitlistPixels />}
          </div>
          {joined && <div className="waitlist-badge-owner" data-joined="true">
            <span title={holder}>{holder || "Your legacy begins"}</span>
            <strong className="waitlist-message">Your story.<br />Our mission.</strong>
          </div>}
        </motion.article>
      </motion.div>
      {joined && <div className="waitlist-actions">
        {pass !== "failed" && <button type="button" className="material-button white" onClick={sharePass} disabled={!pass} aria-busy={!pass}>
          {pass && !pass.shareable ? <>Save your pass<Icon path={SAVE} /></> : <>Share your pass<Icon path={SHARE} /></>}
        </button>}
        <a className="material-button" href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
          Join the group<span className="sr-only"> on WhatsApp (opens in a new tab)</span><WhatsAppIcon />
        </a>
      </div>}
    </motion.div>
    <p className="sr-only" role="status">{phase === "saving" ? "Saving your spot…" : phase === "revealing" ? "Your spot is saved. Getting your pass ready…" : ""}</p>
  </div>;
}
