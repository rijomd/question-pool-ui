import { createAsyncThunk } from '@reduxjs/toolkit';

import { login } from '../constants/UrlConstants';
import apiClient from '../../../service/Axios';
import { setTRefreshToken,setToken } from '../../../service/AuthMethods';

export const loginAction = createAsyncThunk('auth/loginAction', async (body, thunkAPI) => {
    try {
        const response = await apiClient.post(login, body);
        const token = response?.data?.access_token;
        setToken(token);
        setTRefreshToken(response?.data?.refresh_token);
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
