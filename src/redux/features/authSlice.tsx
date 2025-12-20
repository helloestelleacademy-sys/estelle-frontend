import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user:User;
}

type InitialState ={
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    accessToken: string | null;
}

const initialState:InitialState ={
    user:null,
    isAuthenticated: false,
    loading: true,
    accessToken: null
}

const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<AuthResponse>) => {
            state.user =action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated=true;
            state.loading = false;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.user =null;
            state.isAuthenticated=false;
            state.loading =false;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.loading = action.payload;
        },

}})


export const {setUser, logout, setAccessToken} =authSlice.actions;
export default authSlice.reducer;