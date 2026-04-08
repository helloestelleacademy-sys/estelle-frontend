"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import { StellaMessageActions } from "@/components/stella/StellaMessageActions"
import { StellaCitations } from "@/components/stella/StellaCitations"
import { StellaToolCards } from "@/components/stella/StellaToolCards"
import type { StellaFeedback, StellaMessage } from "@/components/stella/types"

type StellaMessageCardProps = {
  message: StellaMessage
  isLastAssistantMessage: boolean
  isStreaming?: boolean
  onRegenerate: () => void
  onFeedback: (messageId: string, feedback: StellaFeedback) => void
}

export function StellaMessageCard({
  message,
  isLastAssistantMessage,
  isStreaming,
  onRegenerate,
  onFeedback,
}: StellaMessageCardProps) {
  const isUser = message.role === "user"

  if (isUser) {
    return null
  }

  return (
    <section className="stella-module space-y-2">
      <div className="stella-module-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="font-display text-sm font-semibold tracking-tight">Answer</div>
            <div className="text-xs text-muted-foreground">Stella</div>
          </div>
          <div className="flex items-center gap-2">
            {isStreaming ? <span className="stella-live text-xs">Live</span> : null}
          </div>
        </div>

        <div className="mt-3 text-[13.5px] leading-relaxed text-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="mb-2 list-disc pl-5 last:mb-0">{children}</ul>,
              ol: ({ children }) => <ol className="mb-2 list-decimal pl-5 last:mb-0">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="rounded bg-muted/60 px-1 py-0.5 text-[0.92em] text-foreground">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="mb-2 overflow-x-auto rounded-xl border bg-muted/40 p-3 text-xs text-foreground/90 last:mb-0">
                  {children}
                </pre>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          {isStreaming ? (
            <span className="ml-1 inline-block h-4 w-0.5 animate-pulse align-middle bg-current/70" />
          ) : null}
        </div>

        <div className="mt-3 border-t pt-3">
          <StellaMessageActions
            content={message.content}
            isLastAssistantMessage={isLastAssistantMessage}
            feedback={message.feedback ?? null}
            onRegenerate={onRegenerate}
            onFeedback={(feedback) => onFeedback(message.id, feedback)}
          />
        </div>
      </div>

      {message.citations?.length ? <StellaCitations citations={message.citations} /> : null}
      {message.blocks?.length ? <StellaToolCards blocks={message.blocks} /> : null}

      {message.status === "error" ? (
        <div className={cn("rounded-xl border bg-destructive/5 px-3 py-2 text-xs text-muted-foreground")}>
          Tip: try again, or toggle “offline/error” in the left panel for testing.
        </div>
      ) : null}
    </section>
  )
}

