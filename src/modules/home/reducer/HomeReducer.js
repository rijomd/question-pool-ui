import { createSlice } from '@reduxjs/toolkit'
import { fetchDashBoard } from "./HomeActions";

const initialState = {
    dashBoardData: {},
    loading: false,
    message: ""
}

export const dashBoardSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDashBoard.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchDashBoard.fulfilled, (state, action) => {
            state.dashBoardData = action.payload.data;
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(fetchDashBoard.rejected, (state, action) => {
            state.dashBoardData = [];
            state.loading = false;
            state.message = action.payload;
        })

    },
})

export const { } = dashBoardSlice.actions

export default dashBoardSlice.reducer;