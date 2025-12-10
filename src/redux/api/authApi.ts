import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { UserDetails } from '../features/authSlice';
import { userApi } from './userApi';

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
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1', credentials: 'include', }),
    endpoints: (builder) => ({
        login: builder.mutation<UserDetails, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
                async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.userProfile.initiate(null));
                   
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        register: builder.mutation<UserDetails, RegisterUser>({
            query: (userData) =>({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.userProfile.initiate(null));                   
                } catch (error) {
                    console.log(error)
                }
            }
        })

    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;