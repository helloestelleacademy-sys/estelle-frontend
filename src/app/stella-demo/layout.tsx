import type { ReactNode } from "react"

export default function StellaDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh stella-aurora">
      <div className="pointer-events-none fixed inset-0 opacity-45 [background-image:radial-gradient(hsl(0_0%_0%_/_0.08)_1px,transparent_1px)] [background-size:18px_18px] dark:opacity-25" />
      <div className="pointer-events-none fixed inset-0 opacity-20 [background-image:radial-gradient(hsl(270_90%_65%_/_0.22)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative">{children}</div>
    </div>
  )
}

