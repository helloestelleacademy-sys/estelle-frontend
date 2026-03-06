import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/redux/features/authSlice";
import { authApi } from "@/redux/api/authApi";
import { userApi } from "@/redux/api/userApi";
import { courseApi } from "@/redux/api/courseApi";
import { paymentApi } from "@/redux/api/paymentApi";
import { newsletterApi } from "@/redux/api/newsletterApi";
import { analyticsApi } from "@/redux/api/analyticsApi";
import { eventApi } from "@/redux/api/eventApi";
// import {api} from "@/redux/api/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [courseApi.reducerPath]: courseApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [newsletterApi.reducerPath]: newsletterApi.reducer,
      [analyticsApi.reducerPath]: analyticsApi.reducer,
      [eventApi.reducerPath]: eventApi.reducer,
      //   [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat([
          authApi.middleware,
          userApi.middleware,
          courseApi.middleware,
          paymentApi.middleware,
          newsletterApi.middleware,
          analyticsApi.middleware,
          eventApi.middleware
        ])
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
