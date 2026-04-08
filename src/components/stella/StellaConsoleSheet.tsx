"use client"

import type { ReactNode } from "react"
import { ChevronUp, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { StellaAvatar } from "@/components/stella/StellaAvatar"
import type { StellaEmotion } from "@/components/stella/types"

export function StellaConsoleSheet(props: {
  emotion: StellaEmotion
  isStreaming: boolean
  moodClassName?: string
  statusLabel: string
  onReset: () => void
  children: ReactNode
}) {
  const { emotion, isStreaming, moodClassName, statusLabel, onReset, children } = props

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl border bg-background/80 px-3 py-2 shadow-sm backdrop-blur"
            aria-label="Open Stella console"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`stella-halo absolute inset-0 -m-2 rounded-[20px] ${moodClassName ?? ""}`} />
                <div className="relative rounded-2xl border bg-background/70 p-1">
                  <StellaAvatar emotion={emotion} talking={isStreaming} className="size-10" />
                </div>
              </div>
              <div className="text-left leading-tight">
                <div className="font-display text-sm font-semibold">Stella</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{statusLabel}</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ChevronUp className="size-4" />
              Console
            </div>
          </button>
        </SheetTrigger>

        <SheetContent side="bottom" className="max-h-[78dvh] rounded-t-3xl px-0 pb-8">
          <SheetHeader className="px-5">
            <div className="flex items-center justify-between gap-3">
              <SheetTitle className="font-display text-base">Stella console</SheetTitle>
              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
          </SheetHeader>

          <div className="px-5 pb-24">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

