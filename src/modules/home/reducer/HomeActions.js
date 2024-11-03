import { createAsyncThunk } from '@reduxjs/toolkit';

import { dashBoard } from '../constants/UrlConstants';
import apiClient from '../../../service/Axios';

export const fetchDashBoard = createAsyncThunk('home/fetchDashBoard', async (body, thunkAPI) => {
    try {
        const response = await apiClient.get(dashBoard);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
