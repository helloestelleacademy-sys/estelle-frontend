import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "../store";

export interface Lesson {
    title: string;
    // Add other properties as needed based on backend
}

export interface Course {
    _id: string;
    title: string;
    slug: string;
    description: string;
    instructor: string;
    price: number;
    image: string;
    level: string;
    status: string;
    modules: { title: string; lessons: Lesson[] }[];
    courseType: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
}

export interface CoursesResponse {
    success: boolean;
    count: number;
    courses: Course[];
}

export interface SingleCourseResponse {
    success: boolean;
    course: Course;
}


export interface Enrollment {
    _id: string;
    student: string;
    course: Course;
    enrolledAt: string;
    completedLessons: string[];
    progress: number;
    isCompleted: boolean;
}

export interface EnrollmentResponse {
    success: boolean;
    count: number;
    enrollments: Enrollment[];
}

export interface EnrollResponse {
    success: boolean;
    message: string;
    enrollment: Enrollment;
}

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Courses", "Enrollments"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllCourses: builder.query<CoursesResponse, { keyword?: string } | void>({
            query: (params) => {
                const keyword = params && 'keyword' in params ? params.keyword : '';
                return {
                    url: "/courses",
                    params: keyword ? { keyword } : undefined
                };
            },
            providesTags: ["Courses"],
        }),
        getFeaturedCourses: builder.query<CoursesResponse, void>({
            query: () => "/courses/featured",
            providesTags: ["Courses"],
        }),
        createCourse: builder.mutation<SingleCourseResponse, FormData | Partial<Course>>({
            query: (courseData) => ({
                url: "/courses",
                method: "POST",
                body: courseData,
            }),
            invalidatesTags: ["Courses"],
        }),
        enrollCourse: builder.mutation<EnrollResponse, { courseId: string }>({
            query: (body) => ({
                url: "/courses/enroll",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Enrollments"],
        }),
        getEnrolledCourses: builder.query<EnrollmentResponse, void>({
            query: () => "/courses/my-courses",
            providesTags: ["Enrollments"],
        }),
        getCourseById: builder.query<SingleCourseResponse, string>({
            query: (id) => `/courses/${id}`,
            providesTags: (result, error, id) => [{ type: "Courses", id }],
        }),
    }),
});

export const {
    useGetAllCoursesQuery,
    useGetFeaturedCoursesQuery,
    useCreateCourseMutation,
    useEnrollCourseMutation,
    useGetEnrolledCoursesQuery,
    useGetCourseByIdQuery,
} = courseApi;
