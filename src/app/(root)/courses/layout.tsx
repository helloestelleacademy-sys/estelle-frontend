import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Our Courses",
    description: "Explore our comprehensive range of personal branding courses. From beginner to advanced, find the right path for your career growth.",
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
