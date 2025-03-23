import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestionList,
  fetchQuestionPool,
  bulkInsertQuestionAction,
} from "./QuestionActions";

const initialState = {
  QuestionList: [],
  QuestionPool: [],
  QuestionPoolCompo: [],
  loading: false,
  message: "",
  error: "",
  isLoadQuestionList: false,
};

export const dashBoardSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestionList.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchQuestionList.fulfilled, (state, action) => {
      state.QuestionList = action.payload;
      state.loading = false;
      state.message = "success";
      state.error = "success";
    });
    builder.addCase(fetchQuestionList.rejected, (state, action) => {
      state.QuestionList = [];
      state.loading = false;
      state.message = action.payload;
      state.error = "error";
    });

    builder.addCase(fetchQuestionPool.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isLoadQuestionList = false; 
    });
    builder.addCase(fetchQuestionPool.fulfilled, (state, action) => {
      state.QuestionPool = action.payload;
      state.QuestionPoolCompo = action.payload?.list.map((x) => {
        return { label: x?.question_name, value: x?.id };
      });
      state.loading = false;
      state.message = "success";
      state.error = "success";
      state.isLoadQuestionList = true; // for fetch question list for answerpool
    });
    builder.addCase(fetchQuestionPool.rejected, (state, action) => {
      state.QuestionPool = [];
      state.loading = false;
      state.message = action.payload;
      state.error = "error";
      state.isLoadQuestionList = false; 
    });

    builder.addCase(bulkInsertQuestionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "success";
      state.error = "success";
    });
  },
});

export const {} = dashBoardSlice.actions;

export default dashBoardSlice.reducer;
