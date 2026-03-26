"use client"

import * as React from "react"
import { Bot, RotateCcw, Send, Sparkles, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type StellaRole = "user" | "assistant"

type StellaMessage = {
  id: string
  role: StellaRole
  content: string
  createdAt: number
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="sr-only">Stella is typing</span>
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-muted-foreground" />
    </div>
  )
}

function ChatBubble({
  role,
  content,
  time,
}: {
  role: StellaRole
  content: React.ReactNode
  time: string
}) {
  const isUser = role === "user"
  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border bg-background">
          <Bot className="size-4 text-muted-foreground" />
        </div>
      ) : null}

      <div className={cn("max-w-[85%] space-y-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-xs",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          {content}
        </div>
        <div className={cn("text-[11px] text-muted-foreground", isUser ? "text-right" : "text-left")}>
          {time}
        </div>
      </div>

      {isUser ? (
        <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border bg-background">
          <User className="size-4 text-muted-foreground" />
        </div>
      ) : null}
    </div>
  )
}

const starterPrompts = [
  "Help me write a short bio for LinkedIn.",
  "Give me a 7-day personal branding plan.",
  "Rewrite this headline to be stronger.",
  "What should I post this week?",
]

function getDemoResponse(input: string) {
  const normalized = input.trim().toLowerCase()

  if (!normalized) return "Tell me what you’re working on and I’ll help."
  if (normalized.includes("bio")) {
    return [
      "Absolutely — here’s a clean, professional bio template you can personalize:",
      "",
      "“I help [audience] achieve [outcome] by [method]. Previously at [company/industry], I’m focused on [current focus]. Outside work, I enjoy [interest].”",
      "",
      "Reply with your role, target audience, and 2–3 wins — I’ll tailor it to you.",
    ].join("\n")
  }
  if (normalized.includes("7-day") || normalized.includes("7 day") || normalized.includes("plan")) {
    return [
      "Here’s a lightweight 7‑day plan (30–45 min/day):",
      "",
      "Day 1: Positioning — who you help + proof points",
      "Day 2: Profile — headline, about, featured, banner",
      "Day 3: Content pillars — pick 3 themes you can repeat",
      "Day 4: Write 2 posts — one story + one how-to",
      "Day 5: Comments — 10 thoughtful comments in your niche",
      "Day 6: Network — 10 targeted connects + 3 DMs",
      "Day 7: Review — what performed + refine next week",
      "",
      "Want this tailored to your role and industry?",
    ].join("\n")
  }
  if (normalized.includes("headline")) {
    return [
      "Send me your current headline and I’ll rewrite it in 3 styles.",
      "",
      "A strong pattern is:",
      "[Role] helping [audience] achieve [outcome] with [unique strength] | [proof/cred]",
    ].join("\n")
  }
  if (normalized.includes("post")) {
    return [
      "Here are 5 post ideas you can rotate this week:",
      "",
      "1) A lesson learned (story + takeaway)",
      "2) A 3-step how-to (actionable)",
      "3) A teardown of a common mistake",
      "4) Your process/checklist",
      "5) A before/after result with proof",
      "",
      "Tell me your niche and I’ll draft one in your voice.",
    ].join("\n")
  }

  return [
    "Got it. To help fast, answer these:",
    "",
    "1) What’s your goal? (job, clients, promotion)",
    "2) Who’s your audience?",
    "3) What proof do you have? (results, numbers, examples)",
    "",
    "Reply with 2–3 bullets and I’ll draft the next step.",
  ].join("\n")
}

export function StellaChatDemo() {
  const [messages, setMessages] = React.useState<StellaMessage[]>(() => [
    {
      id: uid(),
      role: "assistant",
      content:
        "Hi — I’m Stella. I can help you with personal branding, positioning, and content.\n\nTry a prompt below or type your own question.",
      createdAt: Date.now(),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages.length, isTyping])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: StellaMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")

    setIsTyping(true)
    await new Promise((r) => setTimeout(r, 650))

    const assistantMsg: StellaMessage = {
      id: uid(),
      role: "assistant",
      content: getDemoResponse(trimmed),
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, assistantMsg])
    setIsTyping(false)
  }

  function reset() {
    setIsTyping(false)
    setInput("")
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content:
          "Hi — I’m Stella. I can help you with personal branding, positioning, and content.\n\nTry a prompt below or type your own question.",
        createdAt: Date.now(),
      },
    ])
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>
              <div className="leading-tight">
                <CardTitle className="text-base">Stella</CardTitle>
                <div className="text-xs text-muted-foreground">
                  Demo assistant • {isTyping ? "typing…" : "online"}
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <div
            ref={scrollerRef}
            className="h-[520px] overflow-y-auto px-6 py-6 md:h-[600px]"
          >
            <div className="space-y-5">
              {messages.map((m) => (
                <ChatBubble
                  key={m.id}
                  role={m.role}
                  content={<pre className="whitespace-pre-wrap font-sans">{m.content}</pre>}
                  time={formatTime(m.createdAt)}
                />
              ))}

              {isTyping ? (
                <ChatBubble
                  role="assistant"
                  content={<TypingIndicator />}
                  time={formatTime(Date.now())}
                />
              ) : null}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t">
          <form
            className="flex w-full flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              void send(input)
            }}
          >
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => void send(p)}
                  className={cn(
                    "rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground",
                    "hover:bg-accent hover:text-accent-foreground transition-colors"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Stella…"
                className="min-h-12 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    void send(input)
                  }
                }}
              />

              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">States & components</CardTitle>
          <p className="text-sm text-muted-foreground">
            This page is meant to evolve into Stella’s UI kit.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium">Included</div>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Chat shell (header, messages, composer)</li>
              <li>User/assistant bubbles + timestamps</li>
              <li>Typing indicator</li>
              <li>Starter prompt chips</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Next to add</div>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Message actions (copy, regenerate)</li>
              <li>Sources / citations block</li>
              <li>Tool cards (course recommendations)</li>
              <li>Error + offline states</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-muted/40 p-3 text-muted-foreground">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Bot className="size-4" />
              Stella persona
            </div>
            <div className="mt-1">
              Helpful, concise, and practical — focused on career growth & personal branding.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

