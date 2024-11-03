import { createAsyncThunk } from '@reduxjs/toolkit';

import { QuestionList, addQuestion, updateQuestion, deleteQuestion } from '../constants/UrlConstants';
import apiClient from '../../../service/Axios';
import { objectToParams } from '../../../service/Utils';

export const fetchQuestionList = createAsyncThunk('Question/fetchQuestionList', async (body, thunkAPI) => {
    try {
        const response = await apiClient.get(QuestionList + "?" + objectToParams(body));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const addQuestionAction = createAsyncThunk('Question/addQuestion', async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(addQuestion, data);
        thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateQuestionAction = createAsyncThunk('Question/updateQuestion', async (data, thunkAPI) => {
    try {
        const response = await apiClient.put(updateQuestion, data);
        thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})


export const deleteQuestionAction = createAsyncThunk('Question/deleteQuestion', async (id, thunkAPI) => {
    try {
        const response = await apiClient.delete(deleteQuestion + id,);
        thunkAPI.dispatch(fetchQuestionList({ limit: 10, page: 1 }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
