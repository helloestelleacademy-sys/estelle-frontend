"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { Check, Search, X } from "lucide-react";
import { COUNTRIES, POPULAR, type Country } from "./countries";

// Common short forms people type that are not in the names themselves.
const ALIASES: Record<string, string> = { uk: "GB", usa: "US", us: "US", uae: "AE", drc: "CD" };

function matches(query: string): Country[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...POPULAR, ...COUNTRIES];
  const alias = COUNTRIES.find((c) => c.code === ALIASES[q]);
  const starts = COUNTRIES.filter((c) => c.name.toLowerCase().startsWith(q));
  const contains = COUNTRIES.filter((c) => !starts.includes(c) && c.name.toLowerCase().includes(q));
  return [...(alias && !starts.includes(alias) ? [alias] : []), ...starts, ...contains];
}

type SheetProps = {
  selected?: Country;
  onPick: (country: Country) => void;
  onClose: (returnFocus: boolean) => void;
};

/**
 * A searchable country list that slides up inside the pass (so it moves with the card and is never clipped).
 * Combobox pattern: focus stays in the search field; arrows move the highlighted option, Enter picks it.
 */
export function CountrySheet({ open, ...props }: SheetProps & { open: boolean }) {
  return <AnimatePresence>{open && <Sheet {...props} />}</AnimatePresence>;
}

function Sheet({ selected, onPick, onClose }: SheetProps) {
  const reduce = useReducedMotion();
  // False while the sheet animates out: it must not catch clicks meant for the field beneath it.
  const isPresent = useIsPresent();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const options = useMemo(() => matches(query), [query]);
  const grouped = !query.trim();
  const optionId = (index: number) => `${id}-option-${index}`;
  const latest = useRef({ selected, onClose });
  useLayoutEffect(() => { latest.current = { selected, onClose }; });

  // On opening (and on re-opening mid-exit): start fresh, focus, and close on any press outside.
  useEffect(() => {
    if (!isPresent) return;
    const chosen = latest.current.selected;
    setQuery("");
    setActive(Math.max(0, chosen ? matches("").findIndex((c) => c.code === chosen.code) : 0));
    // Fine pointers get the search field straight away; on phones the keyboard waits for a tap.
    if (window.matchMedia("(pointer: fine)").matches) search.current?.focus({ preventScroll: true });
    else panel.current?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !(target instanceof Element && target.closest("#wl-country"))) latest.current.onClose(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [isPresent]);

  useEffect(() => {
    document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, query, id]);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = options.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive((i) => Math.min(last, i + 1)),
      ArrowUp: () => setActive((i) => Math.max(0, i - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      PageDown: () => setActive((i) => Math.min(last, i + 8)),
      PageUp: () => setActive((i) => Math.max(0, i - 8)),
      Enter: () => options[active] && onPick(options[active]),
      Escape: () => onClose(true),
    };
    if (!keys[event.key] || (event.target === search.current && (event.key === "Home" || event.key === "End"))) return;
    event.preventDefault();
    keys[event.key]();
  }

  function option(country: Country, index: number) {
    const isSelected = country.code === selected?.code;
    return (
      <div
        key={`${index}-${country.code}`}
        id={optionId(index)}
        role="option"
        aria-selected={isSelected}
        onPointerDown={(event) => event.preventDefault()}
        onPointerMove={() => setActive(index)}
        onClick={() => onPick(country)}
        className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] px-3 text-[15px] transition-colors duration-100 ${index === active ? "bg-white/[0.08] text-white" : "text-white/85"}`}
      >
        <span aria-hidden="true" className="text-xl leading-none">{country.flag}</span>
        <span className="min-w-0 flex-1 truncate">{country.name}</span>
        {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--wl-accent-soft)]" />}
      </div>
    );
  }

  return (
    <motion.div
      ref={panel}
      role="dialog"
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      data-no-drag
      inert={!isPresent}
      onKeyDown={onKeyDown}
      onBlur={(event) => { if (isPresent && !panel.current?.contains(event.relatedTarget as Node | null)) onClose(false); }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] } }}
      exit={{ opacity: 0, y: reduce ? 0 : 12, transition: { duration: reduce ? 0 : 0.14, ease: [0.23, 1, 0.32, 1] } }}
      style={{ pointerEvents: isPresent ? undefined : "none" }}
      className="absolute inset-x-0 bottom-0 top-12 z-20 flex flex-col rounded-t-[22px] bg-[#211b2b] px-4 pb-4 pt-2 shadow-[inset_0_1px_0_#ffffff17,0_-18px_40px_-18px_#000000d9] outline-none min-[400px]:px-6"
    >
      <div aria-hidden="true" className="mx-auto h-1 w-9 rounded-full bg-white/20" />
      <div className="mt-2 flex items-center justify-between">
        <p id={`${id}-title`} className="text-[15px] font-semibold text-white">Choose your country</p>
        <button
          type="button"
          onClick={() => onClose(true)}
          aria-label="Close"
          className="-mr-2 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--wl-accent-soft)]"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <div className="relative mt-2">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
        <input
          ref={search}
          type="text"
          role="combobox"
          aria-label="Search countries"
          aria-expanded="true"
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={options[active] ? optionId(active) : undefined}
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search countries"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setActive(0); }}
          className="h-11 w-full rounded-[10px] bg-white/[0.06] pl-10 pr-3 text-base text-white outline-none transition-[background-color,box-shadow] duration-150 placeholder:text-white/40 focus-visible:bg-white/[0.09] focus-visible:shadow-[inset_0_0_0_1px_var(--wl-accent-soft)]"
        />
      </div>
      <div id={`${id}-list`} role="listbox" aria-label="Countries" className="-mx-2 mt-2 min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-1 [scrollbar-color:#ffffff26_transparent] [scrollbar-width:thin]">
        {grouped ? (
          <>
            <div role="group" aria-labelledby={`${id}-popular`}>
              <div id={`${id}-popular`} className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Popular</div>
              {POPULAR.map((country, index) => option(country, index))}
            </div>
            <div role="group" aria-labelledby={`${id}-all`}>
              <div id={`${id}-all`} className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">All countries</div>
              {COUNTRIES.map((country, index) => option(country, POPULAR.length + index))}
            </div>
          </>
        ) : options.length ? (
          options.map((country, index) => option(country, index))
        ) : (
          <p className="px-3 py-6 text-sm text-white/55">No country matches “{query.trim()}”.</p>
        )}
      </div>
    </motion.div>
  );
}
