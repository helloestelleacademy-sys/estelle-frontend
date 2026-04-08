import { StellaChatDemo } from "@/components/stella/StellaChatDemo"

export default function StellaDemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 md:py-12">
      <header className="relative overflow-hidden rounded-3xl border bg-background/60 p-6 backdrop-blur md:p-7">
        <div className="pointer-events-none absolute inset-0 opacity-80 stella-mood-thinking" />
        <div className="stella-gradient-strip absolute left-0 top-0 h-1 w-full" />
        <div className="relative flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
              Stella • coach console
            </span>
            <span className="rounded-full border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
              Live • Sources • Tool cards
            </span>
          </div>
          <h1 className="font-display text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Stella
          </h1>
          <p className="text-pretty text-sm text-muted-foreground md:text-base">
            Playful polish with a serious feel — designed like the real product, not a demo.
          </p>
        </div>
      </header>

      <StellaChatDemo />
    </div>
  )
}

