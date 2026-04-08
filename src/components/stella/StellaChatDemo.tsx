"use client"

import * as React from "react"
import { Gauge, Share2, SlidersHorizontal, Sparkles, WifiOff } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StellaChatShell } from "@/components/stella/StellaChatShell"
import { StellaComposer } from "@/components/stella/StellaComposer"
import { StellaMessageList } from "@/components/stella/StellaMessageList"
import { StellaStatusBanner } from "@/components/stella/StellaStatusBanner"
import { StellaExportActions } from "@/components/stella/StellaExportActions"
import { pickEmotionFromContent, type StellaEmotion, type StellaFeedback, type StellaMessage } from "@/components/stella/types"

const starterPrompts = [
  "Help me write a short bio for LinkedIn.",
  "Give me a 7-day personal branding plan.",
  "Rewrite this headline to be stronger.",
  "What should I post this week?",
]

function getDemoResponse(input: string) {
  const normalized = input.trim().toLowerCase()

  if (!normalized) return "Tell me what you are working on and I will help."
  if (normalized.includes("bio")) {
    return [
      "Absolutely - here is a clean, professional bio template you can personalize:",
      "",
      '\"I help [audience] achieve [outcome] by [method]. Previously at [company/industry], I am focused on [current focus]. Outside work, I enjoy [interest].\"',
      "",
      "Reply with your role, target audience, and 2-3 wins and I will tailor it to you.",
    ].join("\n")
  }
  if (normalized.includes("7-day") || normalized.includes("7 day") || normalized.includes("plan")) {
    return [
      "Here is a lightweight 7-day plan (30-45 min/day):",
      "",
      "Day 1: Positioning - who you help + proof points",
      "Day 2: Profile - headline, about, featured, banner",
      "Day 3: Content pillars - pick 3 themes you can repeat",
      "Day 4: Write 2 posts - one story + one how-to",
      "Day 5: Comments - 10 thoughtful comments in your niche",
      "Day 6: Network - 10 targeted connects + 3 DMs",
      "Day 7: Review - what performed + refine next week",
      "",
      "Want this tailored to your role and industry?",
    ].join("\n")
  }
  if (normalized.includes("headline")) {
    return [
      "Send me your current headline and I will rewrite it in 3 styles.",
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
      "Tell me your niche and I will draft one in your voice.",
    ].join("\n")
  }

  return [
    "Got it. To help fast, answer these:",
    "",
    "1) What is your goal? (job, clients, promotion)",
    "2) Who is your audience?",
    "3) What proof do you have? (results, numbers, examples)",
    "",
    "Reply with 2-3 bullets and I will draft the next step.",
  ].join("\n")
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

type BackendChatMessage = { role: "system" | "user" | "assistant"; content: string }

function getBackendBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/v1"
}

async function streamBackendChat(params: {
  messages: BackendChatMessage[]
  onToken: (delta: string) => void
  onDone: () => void
  onError: (message: string) => void
  signal?: AbortSignal
}) {
  const res = await fetch(`${getBackendBaseUrl()}/stella/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: params.messages }),
    signal: params.signal,
  })

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "")
    params.onError(text || `Request failed (${res.status})`)
    return
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder("utf-8")
  let buffer = ""

  const emitFromBlock = (block: string) => {
    const lines = block.split("\n")
    let event = "message"
    let data = ""
    for (const line of lines) {
      if (line.startsWith("event:")) event = line.slice(6).trim()
      if (line.startsWith("data:")) data += line.slice(5).trim()
    }
    if (!data) return
    if (event === "token") {
      try {
        const parsed = JSON.parse(data)
        if (parsed?.delta) params.onToken(String(parsed.delta))
      } catch {
        // ignore
      }
    } else if (event === "done") {
      params.onDone()
    } else if (event === "error") {
      try {
        const parsed = JSON.parse(data)
        params.onError(parsed?.message || "Streaming error")
      } catch {
        params.onError("Streaming error")
      }
    }
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const blocks = buffer.split("\n\n")
    buffer = blocks.pop() ?? ""
    for (const block of blocks) emitFromBlock(block)
  }
}

const initialAssistantMessage: StellaMessage = {
  id: "assistant-0",
  role: "assistant",
  content:
    "Hi - I am Stella. I can help you with personal branding, positioning, and content.\n\nTry a prompt below or type your own question.",
  createdAt: 0,
  feedback: null,
}

function getChunks(text: string) {
  return text.split(/(\s+)/).filter(Boolean)
}

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export function StellaChatDemo() {
  const [messages, setMessages] = React.useState<StellaMessage[]>([initialAssistantMessage])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [streamingMessageId, setStreamingMessageId] = React.useState<string | null>(null)
  const [avatarEmotion, setAvatarEmotion] = React.useState<StellaEmotion>("idle")
  const [emotionOverride, setEmotionOverride] = React.useState<StellaEmotion | null>(null)
  const [forceOffline, setForceOffline] = React.useState(false)
  const [forceErrorOnNextReply, setForceErrorOnNextReply] = React.useState(false)
  const [showToolCards, setShowToolCards] = React.useState(true)
  const runIdRef = React.useRef(0)
  const inactivityRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const streamAbortRef = React.useRef<AbortController | null>(null)

  const effectiveEmotion = emotionOverride ?? avatarEmotion
  const [tokenPulse, setTokenPulse] = React.useState(0)
  const tokenCountRef = React.useRef(0)
  const pulseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const moodClassName =
    effectiveEmotion === "thinking"
      ? "stella-mood-thinking"
      : effectiveEmotion === "smile"
        ? "stella-mood-success"
        : effectiveEmotion === "laugh"
          ? "stella-mood-laugh"
          : effectiveEmotion === "angry"
            ? "stella-mood-angry"
            : effectiveEmotion === "sleep"
              ? "stella-mood-sleep"
              : "stella-mood-thinking"

  const queueSleepTimer = React.useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current)
    inactivityRef.current = setTimeout(() => {
      if (!emotionOverride) setAvatarEmotion("sleep")
    }, 50_000)
  }, [emotionOverride])

  React.useEffect(() => {
    queueSleepTimer()
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current)
    }
  }, [queueSleepTimer])

  React.useEffect(() => {
    // Avoid SSR/client hydration mismatch from Date.now() by setting timestamps after mount.
    setMessages((prev) =>
      prev.map((m) => (m.createdAt ? m : { ...m, createdAt: Date.now() }))
    )
  }, [])

  async function streamAssistantResponse(prompt: string) {
    const localRunId = ++runIdRef.current
    if (!emotionOverride) setAvatarEmotion("thinking")
    setIsTyping(true)
    await delay(500)

    if (localRunId !== runIdRef.current) return

    if (forceErrorOnNextReply) {
      setForceErrorOnNextReply(false)
      setIsTyping(false)
      setStreamingMessageId(null)
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: "I hit a snag generating that response. Please try again.",
          createdAt: Date.now(),
          feedback: null,
          status: "error",
        },
      ])
      if (!emotionOverride) setAvatarEmotion("angry")
      queueSleepTimer()
      return
    }

    const assistantId = uid()
    setIsTyping(false)
    setStreamingMessageId(assistantId)
    tokenCountRef.current = 0
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", createdAt: Date.now(), feedback: null },
    ])

    // Build backend message list (system + conversation so far + new user prompt)
    const system: BackendChatMessage = {
      role: "system",
      content:
        "You are Stella, Estelle's friendly assistant. Be concise, practical, and supportive. Use clear bullet points when helpful.",
    }
    const history: BackendChatMessage[] = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content }))

    const requestMessages: BackendChatMessage[] = [...[system], ...history, { role: "user", content: prompt }]

    streamAbortRef.current?.abort()
    const abort = new AbortController()
    streamAbortRef.current = abort

    const addToolBlocks = showToolCards && /(course|courses|event|events|pricing|learn)/i.test(prompt)
    const citations = [
      {
        title: "Estelle: Personal branding fundamentals",
        url: "https://estellelearning.com",
        snippet: "Positioning, proof points, and repeatable content pillars.",
      },
      {
        title: "Writing better LinkedIn headlines",
        snippet: "Use a role + audience + outcome + proof pattern.",
      },
    ]

    let accumulated = ""
    await streamBackendChat({
      messages: requestMessages,
      signal: abort.signal,
      onToken: (delta) => {
        accumulated += delta
        tokenCountRef.current += 1
        setTokenPulse((v) => v + 1)
        if (!emotionOverride) {
          // bold-playful: mostly stays expressive; quick “ticks” on punctuation/token bursts
          const base: StellaEmotion = "thinking"
          const isBurst = tokenCountRef.current % 14 === 0
          const transient: StellaEmotion = delta.includes("!")
            ? "laugh"
            : delta.includes("?")
              ? "smile"
              : isBurst
                ? "smile"
                : base

          setAvatarEmotion(transient)
          if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current)
          pulseTimeoutRef.current = setTimeout(() => {
            if (!emotionOverride) setAvatarEmotion(base)
          }, transient === base ? 900 : 520)
        }
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        )
      },
      onDone: () => {
        // no-op, handled below
      },
      onError: (message) => {
        setStreamingMessageId(null)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: message || "Streaming error", status: "error" }
              : m
          )
        )
        if (!emotionOverride) setAvatarEmotion("angry")
      },
    })

    if (localRunId === runIdRef.current) {
      setStreamingMessageId(null)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                citations,
                blocks: addToolBlocks
                  ? [{ kind: "course", id: "course-brand-foundations" }, { kind: "event", id: "event-brand-clinic" }]
                  : undefined,
                status: "ok",
              }
            : m
        )
      )
      if (!emotionOverride) {
        // completion settle: brief “success”, then emotion based on content.
        setAvatarEmotion("smile")
        if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current)
        pulseTimeoutRef.current = setTimeout(() => {
          if (!emotionOverride) setAvatarEmotion(pickEmotionFromContent(accumulated))
        }, 750)
      }
      queueSleepTimer()
    }
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping || streamingMessageId) return
    if (forceOffline) return
    if (!emotionOverride) setAvatarEmotion("thinking")
    queueSleepTimer()

    const userMsg: StellaMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
      feedback: null,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")

    await streamAssistantResponse(trimmed)
  }

  async function regenerateLastAssistant() {
    if (isTyping || streamingMessageId) return
    if (forceOffline) return
    if (!emotionOverride) setAvatarEmotion("thinking")
    queueSleepTimer()

    const list = [...messages]
    let lastAssistantIndex = -1
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (list[i].role === "assistant") {
        lastAssistantIndex = i
        break
      }
    }

    if (lastAssistantIndex < 1) return

    let sourcePrompt = ""
    for (let i = lastAssistantIndex - 1; i >= 0; i -= 1) {
      if (list[i].role === "user") {
        sourcePrompt = list[i].content
        break
      }
    }
    if (!sourcePrompt) return

    setMessages((prev) => prev.filter((m) => m.id !== list[lastAssistantIndex].id))
    await streamAssistantResponse(sourcePrompt)
  }

  function updateFeedback(messageId: string, feedback: StellaFeedback) {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, feedback }
          : message
      )
    )
  }

  function reset() {
    runIdRef.current += 1
    setIsTyping(false)
    setStreamingMessageId(null)
    setInput("")
    setAvatarEmotion("idle")
    setEmotionOverride(null)
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current)
    queueSleepTimer()
    setMessages([
      {
        id: "assistant-0",
        role: "assistant",
        content:
          "Hi - I am Stella. I can help you with personal branding, positioning, and content.\n\nTry a prompt below or type your own question.",
        createdAt: 0,
        feedback: null,
      },
    ])
  }

  return (
    <StellaChatShell
      isTyping={isTyping}
      isStreaming={Boolean(streamingMessageId)}
      emotion={effectiveEmotion}
      moodClassName={moodClassName}
      onReset={reset}
      statusBanner={
        forceOffline ? (
          <StellaStatusBanner kind="offline" onRetry={() => setForceOffline(false)} />
        ) : messages.some((m) => m.status === "error") ? (
          <StellaStatusBanner
            kind="error"
            onRetry={() => {
              setMessages((prev) => prev.filter((m) => m.status !== "error"))
            }}
          />
        ) : null
      }
      leftPanel={
        <div className="space-y-4">
          <div className="stella-module-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-medium tracking-wide text-muted-foreground">Session</div>
                <div className="mt-1 font-display text-base font-semibold capitalize text-foreground">
                  {effectiveEmotion}
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
                <Share2 className="size-3.5" />
                Live
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Ask for a rewrite, a plan, or a sharper positioning statement.
            </div>
          </div>

          <div className="stella-module-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium text-foreground">Prompt palette</div>
              <span className="text-xs text-muted-foreground">Tap to send</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void send(prompt)}
                  className="stella-chip text-left text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="stella-module-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="size-4" />
                Share & export
              </div>
              <span className="text-xs text-muted-foreground">Copy or download</span>
            </div>
            <div className="mt-3">
              <StellaExportActions messages={messages} />
            </div>
          </div>

          <details className="stella-module-card p-4 text-sm text-muted-foreground">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground">
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="size-4" />
                Lab settings
              </span>
              <span className="text-xs text-muted-foreground">testing</span>
            </summary>
            <div className="mt-3 space-y-2">
              <label className="flex items-center justify-between gap-3 rounded-xl border bg-background/60 px-3 py-2 text-sm backdrop-blur">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <WifiOff className="size-4" />
                  Offline
                </span>
                <input
                  type="checkbox"
                  checked={forceOffline}
                  onChange={(e) => setForceOffline(e.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-xl border bg-background/60 px-3 py-2 text-sm backdrop-blur">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Gauge className="size-4" />
                  Error next reply
                </span>
                <input
                  type="checkbox"
                  checked={forceErrorOnNextReply}
                  onChange={(e) => setForceErrorOnNextReply(e.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-xl border bg-background/60 px-3 py-2 text-sm backdrop-blur">
                <span className="text-muted-foreground">Tool cards</span>
                <input
                  type="checkbox"
                  checked={showToolCards}
                  onChange={(e) => setShowToolCards(e.target.checked)}
                />
              </label>
              <div className="text-xs text-muted-foreground">Pulse counter: {tokenPulse}</div>
            </div>
          </details>
        </div>
      }
      conversation={
        <StellaMessageList
          messages={messages}
          isTyping={isTyping}
          streamingMessageId={streamingMessageId}
          onRegenerate={regenerateLastAssistant}
          onFeedback={updateFeedback}
        />
      }
      composer={
        <StellaComposer
          value={input}
          disabled={isTyping || Boolean(streamingMessageId) || forceOffline}
          prompts={[]}
          onChange={setInput}
          onSubmit={() => void send(input)}
          onPrompt={(prompt) => void send(prompt)}
        />
      }
    />
  )
}

