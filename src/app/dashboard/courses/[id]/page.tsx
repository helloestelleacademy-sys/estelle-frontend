"use client";

import { useGetCourseByIdQuery, useEnrollCourseMutation, useGetEnrolledCoursesQuery } from "@/redux/api/courseApi";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Lock, PlayCircle, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UnlockCourseModal from "@/components/dashboard/UnlockCourseModal";
import { toast } from "sonner";

const CourseDetail = () => {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    // Fetch Course Data
    const { data, isLoading, error } = useGetCourseByIdQuery(id as string, {
        skip: !id
    });

    // Fetch User Enrollments to check status
    const { data: enrolledData, isLoading: isEnrolledLoading } = useGetEnrolledCoursesQuery();

    // Enrollment Mutation
    const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation();

    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

    if (isLoading || isEnrolledLoading) {
        return (
            <div className="flex bg-white h-screen items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#7852A9]" />
            </div>
        );
    }

    if (error || !data || !data.course) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <h2 className="text-xl font-bold">Course not found</h2>
                <Link href="/dashboard/courses">
                    <Button variant="outline">Back to Courses</Button>
                </Link>
            </div>
        );
    }

    const { course } = data;
    const isLocked = (course as any).isLocked; // Backend flag for plan access
    const accessLevel = (course as any).accessLevel || "Premium";

    // Check if user is already enrolled
    const isEnrolled = enrolledData?.enrollments.some((enrollment) => enrollment.course._id === course._id);

    // Default to first lesson of first module if not selected
    const activeLesson = selectedLesson || (course.modules?.[0]?.lessons?.[0]);

    const handleEnroll = async () => {
        try {
            await enrollCourse({ courseId: course._id }).unwrap();
            toast.success("Successfully enrolled!");
            // The query invalidation in RTK Query should auto-update 'isEnrolled'
        } catch (err) {
            console.error("Enrollment failed", err);
            toast.error("Failed to enroll. Please try again.");
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 md:px-8">
            <Link href="/dashboard/courses" className="text-sm text-gray-500 hover:text-[#7852A9] mb-4 inline-block">
                &larr; Back to Courses
            </Link>

            <div className="flex flex-col gap-8">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-[#7852A9]">{course.level}</Badge>
                        <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                    <p className="text-gray-600 mt-2 max-w-3xl">{course.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content / Video Player */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800 flex items-center justify-center group">

                            {/* STATE 1: LOCKED (Plan Insufficient) */}
                            {isLocked && !activeLesson?.isFreePreview ? (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 text-white p-8 text-center backdrop-blur-sm">
                                    <div className="bg-white/10 p-4 rounded-full mb-4">
                                        <Lock className="w-8 h-8 text-[#fe401c]" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Upgrade to View</h2>
                                    <p className="mb-6 text-gray-300 max-w-sm">
                                        This content is exclusively available for <span className="font-semibold text-white">{accessLevel}</span> plan subscribers.
                                    </p>
                                    <Button
                                        onClick={() => setIsUnlockModalOpen(true)}
                                        className="bg-[#7852A9] hover:bg-[#5e3e87] text-white py-6 px-8 text-lg shadow-lg shadow-[#7852A9]/20 transition-all hover:scale-105"
                                    >
                                        Unlock Full Access
                                    </Button>
                                </div>
                            ) : !isEnrolled ? (
                                /* STATE 2: NOT ENROLLED (But has Plan Access) */
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 text-white p-8 text-center backdrop-blur-md">
                                    <div className="bg-white/10 p-4 rounded-full mb-4">
                                        <BookOpenCheck className="w-8 h-8 text-[#7852A9]" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Ready to Start Learning?</h2>
                                    <p className="mb-6 text-gray-300 max-w-sm">
                                        Enroll in this course to track your progress and access all materials.
                                    </p>
                                    <Button
                                        onClick={handleEnroll}
                                        disabled={isEnrolling}
                                        className="bg-[#7852A9] hover:bg-[#5e3e87] text-white py-6 px-8 text-lg shadow-lg shadow-[#7852A9]/20 transition-all hover:scale-105"
                                    >
                                        {isEnrolling ? <Loader2 className="animate-spin mr-2" /> : null}
                                        Start This Course
                                    </Button>
                                </div>
                            ) : (
                                /* STATE 3: ENROLLED & UNLOCKED (Show Content) */
                                <div className="w-full h-full flex items-center justify-center">
                                    {activeLesson?.contentUrl ? (
                                        /* In real app, render video player here */
                                        <div className="flex flex-col items-center text-white">
                                            <PlayCircle className="w-16 h-16 opacity-80 group-hover:opacity-100 transition-opacity mb-2" />
                                            <p className="text-sm text-gray-400">Video Player Mockup</p>
                                            <p className="font-medium mt-2">{activeLesson.title}</p>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">Select a lesson to start</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Lesson Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {activeLesson?.title || "Course Overview"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm">
                                    {activeLesson?.description || "Select a lesson from the curriculum to start watching."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar / Curriculum */}
                    <div className="space-y-6">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle>Curriculum</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {course.modules?.map((module: any, i: number) => (
                                    <div key={i} className="border-b last:border-0">
                                        <div className="bg-gray-50 p-4 font-medium text-sm text-gray-700">
                                            {module.title}
                                        </div>
                                        <div className="divide-y">
                                            {module.lessons?.map((lesson: any, j: number) => {
                                                const isLessonLocked = isLocked && !lesson.isFreePreview;
                                                const isActive = activeLesson?._id === lesson._id;

                                                return (
                                                    <button
                                                        key={j}
                                                        onClick={() => setSelectedLesson(lesson)}
                                                        disabled={isLocked && !lesson.isFreePreview}
                                                        className={`w-full text-left p-4 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${isActive ? 'bg-[#7852A9]/5 text-[#7852A9] font-medium' : 'text-gray-600'} disabled:opacity-50 disabled:cursor-not-allowed`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <PlayCircle className={`w-4 h-4 ${isActive ? 'text-[#7852A9]' : 'text-gray-400'}`} />
                                                            <span className="line-clamp-1">{lesson.title}</span>
                                                        </div>
                                                        {isLessonLocked ? (
                                                            <Lock className="w-3 h-3 text-gray-400 shrink-0" />
                                                        ) : (
                                                            <span className="text-xs text-gray-400">{lesson.duration || "10m"}</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Prompt to upgrade in sidebar too if locked */}
                        {isLocked && (
                            <Card className="bg-[#7852A9]/5 border-[#7852A9]/20">
                                <CardContent className="pt-6">
                                    <h3 className="font-bold text-[#7852A9] mb-2">Unlock Certified Learning</h3>
                                    <p className="text-sm text-gray-600 mb-4">Get unlimited access to all lessons, quizzes, and certificates.</p>
                                    <Button
                                        onClick={() => setIsUnlockModalOpen(true)}
                                        className="w-full bg-[#7852A9] hover:bg-[#5e3e87]"
                                    >
                                        Upgrade Now
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Prompt to Enroll in sidebar if not enrolled but unlocked */}
                        {!isLocked && !isEnrolled && (
                            <Card className="bg-[#7852A9]/5 border-[#7852A9]/20">
                                <CardContent className="pt-6">
                                    <h3 className="font-bold text-[#7852A9] mb-2">Start Learning</h3>
                                    <p className="text-sm text-gray-600 mb-4">Enroll now to track your progress and earn your certificate.</p>
                                    <Button
                                        onClick={handleEnroll}
                                        disabled={isEnrolling}
                                        className="w-full bg-[#7852A9] hover:bg-[#5e3e87]"
                                    >
                                        {isEnrolling ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                        Enroll Free
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            <UnlockCourseModal
                isOpen={isUnlockModalOpen}
                onClose={() => setIsUnlockModalOpen(false)}
                courseTitle={course.title}
                requiredPlan={accessLevel}
            />
        </div>
    );
}

export default CourseDetail;
