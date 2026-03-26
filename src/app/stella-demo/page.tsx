import { StellaChatDemo } from "@/components/stella/StellaChatDemo"

export default function StellaDemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 md:py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          Stella UI Demo
        </h1>
        <p className="text-pretty text-sm text-muted-foreground md:text-base">
          A component playground for the Estelle chatbot experience.
        </p>
      </header>

      <StellaChatDemo />
    </div>
  )
}

