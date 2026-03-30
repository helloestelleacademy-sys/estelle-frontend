export type StellaCourse = {
  id: string
  title: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  price: string
  description: string
  href?: string
}

export const MOCK_STELLA_COURSES: StellaCourse[] = [
  {
    id: "course-brand-foundations",
    title: "Personal Brand Foundations",
    level: "Beginner",
    duration: "2h 40m",
    price: "Free",
    description: "Clarify positioning, write a strong bio, and pick content pillars you can repeat.",
    href: "/courses",
  },
  {
    id: "course-linkedin-engine",
    title: "LinkedIn Content Engine",
    level: "Intermediate",
    duration: "3h 10m",
    price: "₦29,000",
    description: "A repeatable workflow for writing posts, building credibility, and getting opportunities.",
    href: "/courses",
  },
  {
    id: "course-portfolio-proof",
    title: "Proof, Portfolio & Case Studies",
    level: "Advanced",
    duration: "1h 55m",
    price: "₦49,000",
    description: "Turn your results into clear proof: metrics, screenshots, and narrative that converts.",
    href: "/courses",
  },
]

export function getCourseById(id: string) {
  return MOCK_STELLA_COURSES.find((c) => c.id === id) ?? null
}

