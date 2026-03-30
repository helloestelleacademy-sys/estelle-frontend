"use client"

import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import { StellaMessageActions } from "@/components/stella/StellaMessageActions"
import type { StellaFeedback, StellaMessage } from "@/components/stella/types"

type StellaMessageBubbleProps = {
  message: StellaMessage
  isLastAssistantMessage: boolean
  isStreaming?: boolean
  onRegenerate: () => void
  onFeedback: (messageId: string, feedback: StellaFeedback) => void
}

export function StellaMessageBubble({
  message,
  isLastAssistantMessage,
  isStreaming,
  onRegenerate,
  onFeedback,
}: StellaMessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border bg-background">
          <Bot className="size-4 text-muted-foreground" />
        </div>
      ) : null}

      <div className={cn("max-w-[88%] space-y-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-xs",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="mb-2 list-disc pl-5 last:mb-0">{children}</ul>,
              ol: ({ children }) => <ol className="mb-2 list-decimal pl-5 last:mb-0">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="rounded bg-background/60 px-1 py-0.5 text-[0.92em]">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="mb-2 overflow-x-auto rounded-md bg-background/60 p-2 text-xs last:mb-0">
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

        <div className={cn("text-[11px] text-muted-foreground", isUser ? "text-right" : "text-left")}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

        {!isUser ? (
          <StellaMessageActions
            content={message.content}
            isLastAssistantMessage={isLastAssistantMessage}
            feedback={message.feedback ?? null}
            onRegenerate={onRegenerate}
            onFeedback={(feedback) => onFeedback(message.id, feedback)}
          />
        ) : null}
      </div>

      {isUser ? (
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border bg-background">
          <User className="size-4 text-muted-foreground" />
        </div>
      ) : null}
    </div>
  )
}

