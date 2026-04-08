"use client"

import { AlertTriangle, WifiOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type StellaStatusBannerProps =
  | {
      kind: "offline"
      onRetry?: () => void
      className?: string
    }
  | {
      kind: "error"
      message?: string
      onRetry?: () => void
      className?: string
    }

export function StellaStatusBanner(props: StellaStatusBannerProps) {
  const { className } = props

  if (props.kind === "offline") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b bg-background/60 px-4 py-2 backdrop-blur",
          className
        )}
      >
        <div className="flex items-center gap-2 text-sm">
          <WifiOff className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">You are offline. Messages will not send.</span>
        </div>
        {props.onRetry ? (
          <Button size="sm" variant="outline" type="button" onClick={props.onRetry}>
            Reconnect
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b bg-destructive/10 px-4 py-2 backdrop-blur",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <AlertTriangle className="size-4 text-destructive" />
        <span className="text-muted-foreground">
          {props.message ?? "Something went wrong. Try again."}
        </span>
      </div>
      {props.onRetry ? (
        <Button size="sm" variant="outline" type="button" onClick={props.onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  )
}

