import { createSlice } from '@reduxjs/toolkit'
import { fetchQuestionList, addQuestionAction } from "./QuestionActions";

const initialState = {
    QuestionList: [],
    loading: false,
    message: "",
    error: ""
}

export const dashBoardSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestionList.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(fetchQuestionList.fulfilled, (state, action) => {
            state.QuestionList = action.payload;
            state.loading = false;
            state.message = "success";
            state.error = "success";
        })
        builder.addCase(fetchQuestionList.rejected, (state, action) => {
            state.QuestionList = [];
            state.loading = false;
            state.message = action.payload;
            state.error = "error";
        })
    },
})

export const { } = dashBoardSlice.actions

export default dashBoardSlice.reducer;