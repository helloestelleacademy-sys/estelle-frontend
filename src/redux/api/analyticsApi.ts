import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const analyticsApi = createApi({
    reducerPath: 'analyticsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getOverview: builder.query<{
            success: boolean;
            totalUsers: number;
            totalCourses: number;
            totalRevenue: number;
            recentUsers: any[];
            recentPayments: any[];
            usersPerDay: { _id: string; count: number }[];
        }, void>({
            query: () => '/analytics/overview',
        }),
    }),
});

export const { useGetOverviewQuery } = analyticsApi;
