"use client"

import * as React from "react"
import { Copy, Download, Share2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { StellaMessage } from "@/components/stella/types"

function toMarkdown(messages: StellaMessage[]) {
  const lines: string[] = []
  for (const m of messages) {
    const who = m.role === "assistant" ? "Stella" : "You"
    lines.push(`### ${who}`)
    lines.push(m.content.trim())
    lines.push("")
    if (m.citations?.length) {
      lines.push("Sources:")
      for (const c of m.citations) {
        lines.push(`- ${c.url ? `[${c.title}](${c.url})` : c.title}`)
      }
      lines.push("")
    }
  }
  return lines.join("\n").trim() + "\n"
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function StellaExportActions({ messages, className }: { messages: StellaMessage[]; className?: string }) {
  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(toMarkdown(messages))
      toast.success("Copied markdown")
    } catch {
      toast.error("Could not copy")
    }
  }

  function downloadJson() {
    download("stella-conversation.json", JSON.stringify(messages, null, 2), "application/json")
  }

  async function share() {
    const md = toMarkdown(messages)
    const title = "Stella conversation"
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const navAny: any = navigator
      if (navAny.share) {
        await navAny.share({ title, text: md })
        return
      }
      await navigator.clipboard.writeText(md)
      toast.success("Share unavailable; copied instead")
    } catch {
      toast.error("Could not share")
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="text-sm font-medium">Export</div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" type="button" onClick={downloadJson}>
          <Download className="size-4" />
          JSON
        </Button>
        <Button size="sm" variant="outline" type="button" onClick={() => void copyMarkdown()}>
          <Copy className="size-4" />
          Copy Markdown
        </Button>
        <Button size="sm" variant="outline" type="button" onClick={() => void share()}>
          <Share2 className="size-4" />
          Share
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Share uses the Web Share API when available; otherwise it copies Markdown.
      </div>
    </div>
  )
}

