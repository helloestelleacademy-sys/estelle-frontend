import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserDetails {
    _id:string,
    firstName:string,
    lastName:string;
    email: string;
    password: string;
    role:string;
    createdAt:string
}


type InitialState ={
    user: UserDetails | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState:InitialState ={
    user:null,
    isAuthenticated: false,
    loading: false,
}

const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<UserDetails>) => {
            state.user =action.payload;
            state.isAuthenticated=true;
            state.loading =false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading =action.payload;
        },
        clearUser: (state) => {
            state.user =null;
            state.isAuthenticated=false;
            state.loading =false;
        },

}})


export const {setUser, setLoading, clearUser} =authSlice.actions;
export default authSlice.reducer;