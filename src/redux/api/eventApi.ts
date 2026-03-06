import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "../store";

export interface Event {
    _id: string;
    title: string;
    subText?: string;
    description: string;
    learningPoints?: string[];
    date: string;
    location: string;
    image: string;
    capacity: number;
    price: number;
    registeredCount: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface EventsResponse {
    success: boolean;
    count: number;
    events: Event[];
}

export interface SingleEventResponse {
    success: boolean;
    event: Event;
}

export interface RegisterEventRequest {
    eventId: string;
    name: string;
    email: string;
    country: string;
    phone: string;
}

export interface RegisterEventResponse {
    success: boolean;
    message: string;
    registration: any;
}

export interface RegistrationsResponse {
    success: boolean;
    count: number;
    registrations: any[];
}

export const eventApi = createApi({
    reducerPath: "eventApi",
    tagTypes: ["Events", "Registrations"],
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
        getAllEvents: builder.query<EventsResponse, void>({
            query: () => "/events",
            providesTags: ["Events"],
        }),
        getEventById: builder.query<SingleEventResponse, string>({
            query: (id) => `/events/${id}`,
            providesTags: (result, error, id) => [{ type: "Events", id }],
        }),
        registerForEvent: builder.mutation<RegisterEventResponse, RegisterEventRequest>({
            query: (body) => ({
                url: "/events/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Events", "Registrations"],
        }),
        // Admin endpoints
        createEvent: builder.mutation<SingleEventResponse, Partial<Event>>({
            query: (body) => ({
                url: "/events",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Events"],
        }),
        updateEvent: builder.mutation<SingleEventResponse, { id: string; body: Partial<Event> }>({
            query: ({ id, body }) => ({
                url: `/events/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { id }) => ["Events", { type: "Events", id }],
        }),
        deleteEvent: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/events/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Events"],
        }),
        getEventRegistrations: builder.query<RegistrationsResponse, string>({
            query: (id) => `/events/${id}/registrations`,
            providesTags: (result, error, id) => [{ type: "Registrations", id }],
        }),
    }),
});

export const {
    useGetAllEventsQuery,
    useGetEventByIdQuery,
    useRegisterForEventMutation,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetEventRegistrationsQuery,
} = eventApi;
