import type { ReactNode } from "react"

export default function StellaDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/40">
      {children}
    </div>
  )
}

