"use client"

import { Copy, RefreshCcw, ThumbsDown, ThumbsUp } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { StellaFeedback } from "@/components/stella/types"

type StellaMessageActionsProps = {
  content: string
  isLastAssistantMessage: boolean
  feedback: StellaFeedback
  onRegenerate: () => void
  onFeedback: (feedback: StellaFeedback) => void
}

export function StellaMessageActions({
  content,
  isLastAssistantMessage,
  feedback,
  onRegenerate,
  onFeedback,
}: StellaMessageActionsProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Message copied")
    } catch {
      toast.error("Could not copy message")
    }
  }

  return (
    <div className="flex items-center gap-1 pt-1">
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Copy message"
        onClick={handleCopy}
      >
        <Copy className="size-4" />
      </Button>

      {isLastAssistantMessage ? (
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Regenerate response"
          onClick={onRegenerate}
        >
          <RefreshCcw className="size-4" />
        </Button>
      ) : null}

      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Helpful response"
        className={cn(feedback === "up" && "text-primary")}
        onClick={() => onFeedback(feedback === "up" ? null : "up")}
      >
        <ThumbsUp className="size-4" />
      </Button>

      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Not helpful response"
        className={cn(feedback === "down" && "text-primary")}
        onClick={() => onFeedback(feedback === "down" ? null : "down")}
      >
        <ThumbsDown className="size-4" />
      </Button>
    </div>
  )
}

