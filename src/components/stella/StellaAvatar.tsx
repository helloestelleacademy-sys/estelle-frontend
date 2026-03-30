"use client"

import * as React from "react"
import { Bot } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  STELLA_AGENT_EXPRESSIONS,
  emotionToExpression,
  type StellaEmotion,
  type StellaExpressionKey,
} from "@/components/stella/types"

type StellaAvatarProps = {
  emotion: StellaEmotion
  talking?: boolean
  className?: string
}

export function StellaAvatar({ emotion, talking = false, className }: StellaAvatarProps) {
  const prefersReducedMotion = useReducedMotion()
  const [errored, setErrored] = React.useState(false)

  const expression: StellaExpressionKey = React.useMemo(() => {
    if (prefersReducedMotion) return "idle"
    if (talking) return "working"
    return emotionToExpression(emotion)
  }, [emotion, prefersReducedMotion, talking])

  const src = STELLA_AGENT_EXPRESSIONS[expression]

  return (
    <div
      className={cn("overflow-hidden rounded-full border bg-muted/30", className)}
      aria-label={`Stella avatar (${expression})`}
      title={`Stella: ${expression}`}
    >
      {!errored ? (
        // Intentionally <img> so the paths work from /public without extra config.
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <FallbackAvatar className="h-full w-full" emotion={emotion} />
      )}
    </div>
  )
}

function FallbackAvatar({ className, emotion }: { className?: string; emotion: StellaEmotion }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border bg-background text-muted-foreground",
        className
      )}
      aria-label={`Stella avatar (${emotion})`}
      title={`Stella is ${emotion}`}
    >
      <Bot className="size-1/2" />
    </div>
  )
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return reduced
}

