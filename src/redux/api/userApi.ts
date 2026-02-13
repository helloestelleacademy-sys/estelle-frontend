import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { updateUser, User } from "@/redux/features/authSlice"
import type { RootState } from "../store";


export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1", credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        userProfile: builder.query<User, void | null>({
            query: () => "/auth/profile",
            transformResponse: (result: { userDetails: User }) => result.userDetails,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(updateUser(data));
                } catch (error) {
                    // dispatch(setLoading(false))
                    console.log(error)
                }
            },
            providesTags: ["User"]
        }),

        getAllUsers: builder.query<{ success: boolean; users: any[]; total: number; page: number; pages: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
        }),
        getUserDetails: builder.query<{ success: boolean; user: any; enrollments: any[]; payments: any[] }, string>({
            query: (id) => `/users/${id}`,
        }),
    })
})

export const { useUserProfileQuery, useGetAllUsersQuery, useGetUserDetailsQuery } = userApi