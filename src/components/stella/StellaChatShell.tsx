import type { ReactNode } from "react"
import { RotateCcw, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StellaAvatar } from "@/components/stella/StellaAvatar"
import type { StellaEmotion } from "@/components/stella/types"

type StellaChatShellProps = {
  isTyping: boolean
  isStreaming: boolean
  emotion: StellaEmotion
  onReset: () => void
  statusBanner?: ReactNode
  messageList: ReactNode
  composer: ReactNode
}

export function StellaChatShell({
  isTyping,
  isStreaming,
  emotion,
  onReset,
  statusBanner,
  messageList,
  composer,
}: StellaChatShellProps) {
  const status = isTyping || isStreaming ? "thinking" : emotion === "sleep" ? "resting" : "online"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <StellaAvatar emotion={emotion} talking={isStreaming} className="size-12 md:size-16" />
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary md:size-10">
              <Sparkles className="size-4" />
            </div>
            <div className="leading-tight">
              <CardTitle className="text-base">Stella</CardTitle>
              <div className="text-xs text-muted-foreground">
                Demo assistant - {status}
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      </CardHeader>

      {statusBanner}
      <CardContent className="px-0">{messageList}</CardContent>
      <CardFooter className="border-t">{composer}</CardFooter>
    </Card>
  )
}

