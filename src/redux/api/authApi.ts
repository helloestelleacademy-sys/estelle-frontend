import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthResponse, setUser, setAccessToken } from '../features/authSlice';
import type { RootState } from "../store";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
};


export const authApi = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login successful:", data);
          dispatch(setUser({ user: data.user, accessToken: data.accessToken, message: data.message }));
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterUser>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Registration successful:", data);
          dispatch(setUser({ user: data.user, accessToken: data.accessToken, message: data.message }));
        } catch (error) {
          console.log("Registration error:", error);
        }
      },
    }),

    refresh: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Refresh successful:", data);
          dispatch(setUser({ user: data.user, accessToken: data.accessToken, message: data.message }));
        } catch (error) {
          console.log("Refresh error:", error);
          dispatch(setAccessToken(null)); // or clearAuth
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyRefreshQuery } = authApi;