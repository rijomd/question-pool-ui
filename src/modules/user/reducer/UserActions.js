import { createAsyncThunk } from '@reduxjs/toolkit';

import { addUser, updateUser, userList } from '../constants/UrlConstants';
import apiClient from '../../../service/Axios';
import { objectToParams } from '../../../service/Utils';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (body, thunkAPI) => {
    try {
        const response = await apiClient.get(userList + "?" + objectToParams(body));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const addUserAction = createAsyncThunk('user/addUser', async (data, thunkAPI) => {
    try {
        const response = await apiClient.post(addUser, data);
        thunkAPI.dispatch(fetchUserData({ limit: 10, page: 1 }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const updateUserAction = createAsyncThunk('user/updateUser', async (data, thunkAPI) => {
    try {
        const response = await apiClient.put(updateUser, data);
        thunkAPI.dispatch(fetchUserData({ limit: 10, page: 1 }));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

