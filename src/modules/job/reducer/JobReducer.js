import { createSlice } from '@reduxjs/toolkit'
import { fetchJobList, addJobAction } from "./JobActions";

const initialState = {
    jobList: [],
    jobCompo: [],
    loading: false,
    message: "",
    error: ""
}

export const dashBoardSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJobList.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(fetchJobList.fulfilled, (state, action) => {
            state.jobList = action.payload;
            state.loading = false;
            state.message = "success";
            state.error = "success";

            state.jobCompo = action.payload.length > 0 && action.payload?.filter((item) => item?.status?.toUpperCase() === "ACTIVE").map(x => { return { label: x?.job_name, value: x?.id } });
        })
        builder.addCase(fetchJobList.rejected, (state, action) => {
            state.jobList = [];
            state.loading = false;
            state.message = action.payload;
            state.error = "error";
        })
    },
})

export const { } = dashBoardSlice.actions

export default dashBoardSlice.reducer;