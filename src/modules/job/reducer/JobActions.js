import { createAsyncThunk } from '@reduxjs/toolkit';

import { jobList, addJob, updateJob, deleteJob } from '../constants/UrlConstants';
import apiClient from '../../../service/Axios';

export const fetchJobList = createAsyncThunk('job/fetchJobList', async (thunkAPI) => {
    try {
        const response = await apiClient.get(jobList);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const addJobAction = createAsyncThunk('job/addJob', async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(addJob, data);
        thunkAPI.dispatch(fetchJobList());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateJobAction = createAsyncThunk('job/updateJob', async (data, thunkAPI) => {
    try {
        const response = await apiClient.put(updateJob, data);
        thunkAPI.dispatch(fetchJobList());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})


export const deleteJobAction = createAsyncThunk('job/deleteJob', async (id, thunkAPI) => {
    try {
        const response = await apiClient.delete(deleteJob + id,);
        thunkAPI.dispatch(fetchJobList());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
