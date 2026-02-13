import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsletterApi = createApi({
    reducerPath: 'newsletterApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1",
    }),
    endpoints: (builder) => ({
        subscribe: builder.mutation<{ status: string; message: string }, { email: string }>({
            query: (body) => ({
                url: '/newsletter/subscribe',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useSubscribeMutation } = newsletterApi;
