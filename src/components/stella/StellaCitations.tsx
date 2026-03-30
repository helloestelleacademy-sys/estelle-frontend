"use client"

import * as React from "react"
import { ExternalLink, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import type { StellaCitation } from "@/components/stella/types"

export function StellaCitations({ citations, className }: { citations: StellaCitation[]; className?: string }) {
  const [open, setOpen] = React.useState(false)

  if (!citations.length) return null

  return (
    <div className={cn("rounded-xl border bg-background/60 p-3", className)}>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-2 text-left text-xs font-medium",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none rounded-md"
        )}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Info className="size-4" />
          Sources
        </span>
        <span className="text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>

      {open ? (
        <ul className="mt-3 space-y-2">
          {citations.map((c, idx) => (
            <li key={`${c.title}-${idx}`} className="rounded-lg border bg-card/40 p-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium">{c.title}</div>
                  {c.snippet ? (
                    <div className="mt-0.5 text-xs text-muted-foreground">{c.snippet}</div>
                  ) : null}
                </div>
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Open source link"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

