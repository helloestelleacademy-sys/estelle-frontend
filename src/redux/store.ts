import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/redux/features/authSlice";
import { authApi } from "@/redux/api/authApi";
import { userApi } from "@/redux/api/userApi";
// import {api} from "@/redux/api/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    //   [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat([authApi.middleware, userApi.middleware,])
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
