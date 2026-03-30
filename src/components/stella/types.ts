export type StellaRole = "user" | "assistant"

export type StellaFeedback = "up" | "down" | null

export const STELLA_EMOTIONS = [
  "idle",
  "thinking",
  "smile",
  "laugh",
  "angry",
  "sleep",
] as const

export type StellaEmotion = (typeof STELLA_EMOTIONS)[number]

export const STELLA_EMOTION_INDEX: Record<StellaEmotion, number> = {
  idle: 0,
  thinking: 1,
  smile: 2,
  laugh: 3,
  angry: 4,
  sleep: 5,
}

export type StellaMessage = {
  id: string
  role: StellaRole
  content: string
  createdAt: number
  feedback?: StellaFeedback
  citations?: StellaCitation[]
  blocks?: StellaBlock[]
  status?: "ok" | "error"
}

export type StellaCitation = {
  title: string
  url?: string
  snippet?: string
}

export type StellaBlock =
  | { kind: "course"; id: string }
  | { kind: "event"; id: string }

export const STELLA_EXPRESSION_KEYS = [
  "idle",
  "processing",
  "listening",
  "success",
  "completed",
  "error",
  "working",
  "confused",
  "waiting",
] as const

export type StellaExpressionKey = (typeof STELLA_EXPRESSION_KEYS)[number]

/**
 * Image paths (recommended): put these in `estelle-frontend/public/assets/images/*`
 * and reference them as `/assets/images/<file>.png`.
 */
export const STELLA_AGENT_EXPRESSIONS: Record<StellaExpressionKey, string> = {
  idle: "/assets/images/neutral.png",
  processing: "/assets/images/thinking.png",
  listening: "/assets/images/inquisitive.png",
  success: "/assets/images/winking.png",
  completed: "/assets/images/laughing.png",
  error: "/assets/images/anxious.png",
  working: "/assets/images/focused.png",
  confused: "/assets/images/skeptical.png",
  waiting: "/assets/images/side-eye.png",
}

export function pickEmotionFromContent(text: string): StellaEmotion {
  const normalized = text.toLowerCase()

  if (/(error|cannot|can't|wont|won't|frustrat|blocked|issue|fail)/.test(normalized)) {
    return "angry"
  }

  if (/(haha|lol|laugh|funny)/.test(normalized)) {
    return "laugh"
  }

  if (/(great|awesome|amazing|happy|nice|love|perfect)/.test(normalized)) {
    return "smile"
  }

  return "idle"
}

export function emotionToExpression(emotion: StellaEmotion): StellaExpressionKey {
  switch (emotion) {
    case "thinking":
      return "processing"
    case "smile":
      return "success"
    case "laugh":
      return "completed"
    case "angry":
      return "error"
    case "sleep":
      return "waiting"
    case "idle":
    default:
      return "idle"
  }
}

