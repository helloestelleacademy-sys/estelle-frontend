import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AuthResponse, setUser } from "@/redux/features/authSlice"
import type { RootState } from "../store";


export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1', credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        userProfile: builder.query<AuthResponse, void | null>({
            query: () => "/auth/profile",
            transformResponse: (result: { userDetails: AuthResponse }) => result.userDetails,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser({ user: data.user, accessToken: data.accessToken, message: data.message }));
                } catch (error) {
                    // dispatch(setLoading(false))
                    console.log(error)
                }
            },
            providesTags: ["User"]
        }),

    })
})

export const { useUserProfileQuery } = userApi