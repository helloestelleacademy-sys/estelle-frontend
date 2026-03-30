export type StellaEvent = {
  id: string
  title: string
  startsAt: string
  timezone: string
  location: "Online" | "In-person"
  description: string
  href?: string
}

export const MOCK_STELLA_EVENTS: StellaEvent[] = [
  {
    id: "event-brand-clinic",
    title: "Brand Clinic: Positioning Review",
    startsAt: "Sat 2:00 PM",
    timezone: "WAT",
    location: "Online",
    description: "Live session to refine your niche, headline, and proof points.",
    href: "/events",
  },
  {
    id: "event-content-sprint",
    title: "Content Sprint: Write 3 Posts",
    startsAt: "Wed 7:00 PM",
    timezone: "WAT",
    location: "Online",
    description: "Bring drafts. Leave with publish-ready posts and hooks.",
    href: "/events",
  },
]

export function getEventById(id: string) {
  return MOCK_STELLA_EVENTS.find((e) => e.id === id) ?? null
}

