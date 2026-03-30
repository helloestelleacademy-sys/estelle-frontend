"use client"

import * as React from "react"

import { StellaMessageBubble } from "@/components/stella/StellaMessageBubble"
import { StellaTypingIndicator } from "@/components/stella/StellaTypingIndicator"
import type { StellaFeedback, StellaMessage } from "@/components/stella/types"

type StellaMessageListProps = {
  messages: StellaMessage[]
  isTyping: boolean
  streamingMessageId: string | null
  onRegenerate: () => void
  onFeedback: (messageId: string, feedback: StellaFeedback) => void
}

export function StellaMessageList({
  messages,
  isTyping,
  streamingMessageId,
  onRegenerate,
  onFeedback,
}: StellaMessageListProps) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const shouldStickRef = React.useRef(true)

  function handleScroll() {
    const el = scrollerRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    shouldStickRef.current = distanceFromBottom < 72
  }

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el || !shouldStickRef.current) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isTyping, streamingMessageId])

  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id

  return (
    <div
      ref={scrollerRef}
      className="h-[68dvh] min-h-[460px] overflow-y-auto px-4 py-5 md:h-[72dvh] md:max-h-[760px] md:px-6 md:py-6"
      onScroll={handleScroll}
    >
      <div className="space-y-5">
        {messages.map((message) => (
          <StellaMessageBubble
            key={message.id}
            message={message}
            isLastAssistantMessage={message.id === lastAssistantId}
            isStreaming={streamingMessageId === message.id}
            onRegenerate={onRegenerate}
            onFeedback={onFeedback}
          />
        ))}

        {isTyping ? (
          <div className="flex justify-start gap-3">
            <div className="mt-0.5 rounded-2xl bg-muted px-4 py-2 text-sm shadow-xs">
              <StellaTypingIndicator />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

