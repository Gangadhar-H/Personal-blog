import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true,
                state.user = action.payload
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false,
                state.user = null,
                localStorage.clear();
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },


    }
});

export const { loginSuccess, logoutSuccess, updateUser } = authSlice.actions;
export default authSlice.reducer;
