export function StellaTypingIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="sr-only">Stella is typing</span>
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-muted-foreground" />
    </div>
  )
}

