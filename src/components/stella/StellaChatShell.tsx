import type { ReactNode } from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StellaAvatar } from "@/components/stella/StellaAvatar"
import { StellaConsoleSheet } from "@/components/stella/StellaConsoleSheet"
import type { StellaEmotion } from "@/components/stella/types"

type StellaChatShellProps = {
  isTyping: boolean
  isStreaming: boolean
  emotion: StellaEmotion
  moodClassName?: string
  onReset: () => void
  statusBanner?: ReactNode
  leftPanel: ReactNode
  conversation: ReactNode
  composer: ReactNode
}

export function StellaChatShell({
  isTyping,
  isStreaming,
  emotion,
  moodClassName,
  onReset,
  statusBanner,
  leftPanel,
  conversation,
  composer,
}: StellaChatShellProps) {
  const status = isTyping || isStreaming ? "thinking" : emotion === "sleep" ? "resting" : "online"

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
      <div className="hidden lg:block">
        <Card className="stella-console overflow-hidden shadow-sm lg:sticky lg:top-6 lg:self-start">
          <CardHeader className="relative overflow-hidden border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <div className={`pointer-events-none absolute inset-0 opacity-80 ${moodClassName ?? ""}`} />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div
                    className={`stella-halo absolute inset-0 -m-2 rounded-[26px] ${moodClassName ?? ""}`}
                    aria-hidden="true"
                  />
                  <div className="relative rounded-2xl border bg-background/70 p-1 backdrop-blur">
                    <StellaAvatar emotion={emotion} talking={isStreaming} className="size-14 md:size-16" />
                  </div>
                </div>
                <div className="leading-tight">
                  <CardTitle className="font-display text-base tracking-tight">Stella</CardTitle>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-2 py-0.5 backdrop-blur">
                      <span className="inline-block size-1.5 rounded-full bg-emerald-500/80" />
                      {status}
                    </span>
                    <span className="hidden sm:inline">Coach console</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-4">{leftPanel}</CardContent>
        </Card>
      </div>

      <Card className="stella-timeline overflow-hidden shadow-sm lg:min-h-[calc(100dvh-6rem)]">
        {statusBanner}
        <CardContent className="px-0">{conversation}</CardContent>
        <CardFooter className="border-t pb-20 lg:pb-6">{composer}</CardFooter>
      </Card>

      <StellaConsoleSheet
        emotion={emotion}
        isStreaming={isStreaming}
        moodClassName={moodClassName}
        statusLabel={status}
        onReset={onReset}
      >
        {leftPanel}
      </StellaConsoleSheet>
    </div>
  )
}

