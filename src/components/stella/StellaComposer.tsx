"use client"

import * as React from "react"
import { Paperclip, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type StellaComposerProps = {
  value: string
  disabled?: boolean
  prompts: string[]
  onChange: (value: string) => void
  onSubmit: () => void
  onPrompt: (prompt: string) => void
}

export function StellaComposer({
  value,
  disabled,
  prompts,
  onChange,
  onSubmit,
  onPrompt,
}: StellaComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`
  }, [value])

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPrompt(prompt)}
            className={cn(
              "rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
            )}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled
          aria-label="Attach file (coming soon)"
          title="Attachment support coming soon"
          className="shrink-0"
        >
          <Paperclip className="size-4" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Message Stella..."
          className="min-h-12 resize-none"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSubmit()
            }
          }}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                type="submit"
                size="icon-lg"
                disabled={!value.trim() || disabled}
                aria-label="Send message"
                className="shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>Press Enter to send, Shift+Enter for newline</TooltipContent>
        </Tooltip>
      </div>
    </form>
  )
}

