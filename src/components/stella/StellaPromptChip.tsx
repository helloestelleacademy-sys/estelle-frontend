"use client"

import type { StellaMessage } from "@/components/stella/types"

export function StellaPromptChip({ message }: { message: StellaMessage }) {
  return (
    <div className="flex justify-end">
      <div className="stella-chip max-w-[94%]">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] font-medium tracking-wide text-muted-foreground">You</div>
          <div className="text-[11px] text-muted-foreground">Prompt</div>
        </div>
        <div className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-foreground">
          {message.content}
        </div>
      </div>
    </div>
  )
}

