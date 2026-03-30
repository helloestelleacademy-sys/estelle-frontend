"use client"

import { Calendar, GraduationCap, MapPin, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { StellaBlock } from "@/components/stella/types"
import { getCourseById } from "@/components/stella/mockCourses"
import { getEventById } from "@/components/stella/mockEvents"

export function StellaToolCards({ blocks, className }: { blocks: StellaBlock[]; className?: string }) {
  if (!blocks.length) return null

  return (
    <div className={cn("grid gap-3", className)}>
      {blocks.map((b) => {
        if (b.kind === "course") {
          const course = getCourseById(b.id)
          if (!course) return null
          return (
            <Card key={`course-${course.id}`} className="shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-sm">{course.title}</CardTitle>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Timer className="size-4" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="size-4" />
                    {course.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <a href={course.href ?? "#"}>View course</a>
                  </Button>
                  <Button size="sm" variant="outline" type="button">
                    Add to plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        }

        const event = getEventById(b.id)
        if (!event) return null

        return (
          <Card key={`event-${event.id}`} className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-sm">{event.title}</CardTitle>
                <Badge variant="outline">{event.location}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-4" />
                  {event.startsAt} {event.timezone}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-4" />
                  {event.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild size="sm">
                  <a href={event.href ?? "#"}>View event</a>
                </Button>
                <Button size="sm" variant="outline" type="button">
                  Remind me
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

