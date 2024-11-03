import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from "./AuthActions";

const initialState = {
    status: 'idle',
    message: "",
    token: "",
    refresh_token: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        clearToken: (state) => {
            state.token = "";
            state.refresh_token = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.status = 'success';
            state.token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.message = action.payload?.message || "Success";
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.status = 'failed';
            state.message = action.payload?.message || "Error";
        })

    },
})

export const { setToken, clearToken } = authSlice.actions

export default authSlice.reducer;