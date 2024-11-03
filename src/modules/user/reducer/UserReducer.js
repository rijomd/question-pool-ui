import { createSlice } from '@reduxjs/toolkit'
import { fetchUserData } from "./UserActions";

const initialState = {
    userData: [],
    total: 0,
    loading: false,
    message: "",
    error: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.userData = action.payload.list;
            state.total = action.payload.total;
            state.loading = false;
            state.error = "false";
            state.message = action.payload?.message || "success";
        })
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.userData = [];
            state.loading = false;
            state.error = "error";
            state.message = action.payload;
        })

    },
})

export const { } = userSlice.actions

export default userSlice.reducer;