import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  QuestionList,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  QuestionPool,
  addQuestionPool,
  bulkInsertQuestion,
} from "../constants/UrlConstants";
import apiClient from "../../../service/Axios";
import { objectToParams } from "../../../service/Utils";

export const fetchQuestionList = createAsyncThunk(
  "Question/fetchQuestionList",
  async (body, thunkAPI) => {
    try {
      const response = await apiClient.get(
        QuestionList + "?" + objectToParams(body)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addQuestionAction = createAsyncThunk(
  "Question/addQuestion",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(addQuestion, data);
      thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateQuestionAction = createAsyncThunk(
  "Question/updateQuestion",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.put(updateQuestion, data);
      thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteQuestionAction = createAsyncThunk(
  "Question/deleteQuestion",
  async (id, thunkAPI) => {
    try {
      const response = await apiClient.delete(deleteQuestion + id);
      thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchQuestionPool = createAsyncThunk(
  "Question/fetchQuestionPool",
  async (body, thunkAPI) => {
    try {
      const response = await apiClient.get(
        QuestionPool + "?" + objectToParams(body)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addQuestionPoolAction = createAsyncThunk(
  "Question/addQuestionPool",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(addQuestionPool, data);
      thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateQuestionPoolAction = createAsyncThunk(
  "Question/updateQuestionPool",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(addQuestionPool, data);
      thunkAPI.dispatch(fetchQuestionPool({ limit: 10, page: 1 }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const bulkInsertQuestionAction = createAsyncThunk(
  "Question/bulkInsertQuestionAction",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(bulkInsertQuestion, {
        questions: data,
      });
      thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
