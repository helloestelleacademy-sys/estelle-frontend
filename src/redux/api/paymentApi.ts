import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "../store";

export interface InitializePaymentRequest {
    amount: number;
    currency?: string;
    metadata?: any;
}

export interface InitializePaymentResponse {
    success: boolean;
    authorization_url: string;
    access_code: string;
    reference: string;
}

export interface VerifyPaymentResponse {
    success: boolean;
    status: string;
    data: any;
}

export const paymentApi = createApi({
    reducerPath: "paymentApi",
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
        initializePayment: builder.mutation<InitializePaymentResponse, InitializePaymentRequest>({
            query: (body) => ({
                url: "/payments/initialize",
                method: "POST",
                body,
            }),
        }),
        verifyPayment: builder.query<VerifyPaymentResponse, string>({
            query: (reference) => `/payments/verify/${reference}`,
        }),
    }),
});

export const {
    useInitializePaymentMutation,
    useVerifyPaymentQuery,
    useLazyVerifyPaymentQuery
} = paymentApi;
