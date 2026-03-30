"use client"

import * as React from "react"
import { Bot } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StellaChatShell } from "@/components/stella/StellaChatShell"
import { StellaComposer } from "@/components/stella/StellaComposer"
import { StellaMessageList } from "@/components/stella/StellaMessageList"
import {
  STELLA_EMOTIONS,
  pickEmotionFromContent,
  type StellaEmotion,
  type StellaFeedback,
  type StellaMessage,
} from "@/components/stella/types"

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

const initialAssistantMessage = {
  id: uid(),
  role: "assistant" as const,
  content:
    "Hi - I am Stella. I can help you with personal branding, positioning, and content.\n\nTry a prompt below or type your own question.",
  createdAt: Date.now(),
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
  const runIdRef = React.useRef(0)
  const inactivityRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const effectiveEmotion = emotionOverride ?? avatarEmotion

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

  async function streamAssistantResponse(prompt: string) {
    const localRunId = ++runIdRef.current
    if (!emotionOverride) setAvatarEmotion("thinking")
    setIsTyping(true)
    await delay(500)

    if (localRunId !== runIdRef.current) return

    const assistantId = uid()
    setIsTyping(false)
    setStreamingMessageId(assistantId)
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", createdAt: Date.now(), feedback: null },
    ])

    const reply = getDemoResponse(prompt)
    const chunks = getChunks(reply)
    for (let i = 0; i < chunks.length; i += 1) {
      if (localRunId !== runIdRef.current) return
      await delay(Math.min(55, i < 12 ? 30 : 45))
      const nextChunk = chunks[i]
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? { ...message, content: `${message.content}${nextChunk}` }
            : message
        )
      )
    }

    if (localRunId === runIdRef.current) {
      setStreamingMessageId(null)
      if (!emotionOverride) {
        setAvatarEmotion(pickEmotionFromContent(reply))
      }
      queueSleepTimer()
    }
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping || streamingMessageId) return
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
    queueSleepTimer()
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content:
          "Hi - I am Stella. I can help you with personal branding, positioning, and content.\n\nTry a prompt below or type your own question.",
        createdAt: Date.now(),
        feedback: null,
      },
    ])
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
      <StellaChatShell
        isTyping={isTyping}
        isStreaming={Boolean(streamingMessageId)}
        emotion={effectiveEmotion}
        onReset={reset}
        messageList={
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
            disabled={isTyping || Boolean(streamingMessageId)}
            prompts={starterPrompts}
            onChange={setInput}
            onSubmit={() => void send(input)}
            onPrompt={(prompt) => void send(prompt)}
          />
        }
      />

      <div className="lg:block">
        <details className="group rounded-xl border bg-card lg:hidden" open>
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium">
            States and components
          </summary>
          <div className="border-t px-4 py-4">
            <SidebarContent
              emotionOverride={emotionOverride}
              onPreviewEmotion={(emotion) => {
                setEmotionOverride((current) => (current === emotion ? null : emotion))
              }}
              clearPreview={() => setEmotionOverride(null)}
            />
          </div>
        </details>

        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle className="text-base">States and components</CardTitle>
            <p className="text-sm text-muted-foreground">
              This page evolves Stella's frontend UI kit.
            </p>
          </CardHeader>
          <CardContent>
            <SidebarContent
              emotionOverride={emotionOverride}
              onPreviewEmotion={(emotion) => {
                setEmotionOverride((current) => (current === emotion ? null : emotion))
              }}
              clearPreview={() => setEmotionOverride(null)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SidebarContent({
  emotionOverride,
  onPreviewEmotion,
  clearPreview,
}: {
  emotionOverride?: StellaEmotion | null
  onPreviewEmotion?: (emotion: StellaEmotion) => void
  clearPreview?: () => void
}) {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <div className="font-medium">Emotion preview</div>
        <div className="flex flex-wrap gap-2">
          {STELLA_EMOTIONS.map((emotion) => (
            <button
              key={emotion}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
                emotionOverride === emotion
                  ? "border-primary bg-primary/10 text-primary"
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => onPreviewEmotion?.(emotion)}
            >
              {emotion}
            </button>
          ))}
          <button
            type="button"
            className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => clearPreview?.()}
          >
            Auto mode
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium">Included now</div>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Safe markdown rendering in chat bubbles</li>
          <li>Streaming-like assistant responses</li>
          <li>Copy, regenerate, and feedback actions</li>
          <li>Auto-grow composer with keyboard hints</li>
          <li>Event-driven Rive emotion system</li>
        </ul>
      </div>

      <div className="space-y-2">
        <div className="font-medium">Next to add</div>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Source and citation blocks</li>
          <li>Tool cards for courses and events</li>
          <li>Error and offline states</li>
          <li>Conversation export and share</li>
        </ul>
      </div>

      <div className="rounded-lg border bg-muted/40 p-3 text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Bot className="size-4" />
          Stella persona
        </div>
        <div className="mt-1">
          Helpful, concise, practical coaching for career growth and personal branding.
        </div>
      </div>
    </div>
  )
}

