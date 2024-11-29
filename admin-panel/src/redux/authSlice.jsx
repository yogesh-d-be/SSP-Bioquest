import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken:  null,
    refreshToken: null
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setTokens: (state, action) => {
            state.accessToken = action.payload;
            state.refreshToken = action.payload;

            // localStorage.setItem("bioquest", action.payload.accessToken);
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            // Remove accessToken from localStorage
            // localStorage.removeItem("bioquest");

            // // Remove refreshToken from cookies
            // document.cookie = "refreshToken=; path=/; Max-Age=0; Secure; HttpOnly; SameSite=Strict";
        }
    }
});


export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;