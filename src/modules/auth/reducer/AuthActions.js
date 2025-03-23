import { createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../constants/UrlConstants";
import apiClient from "../../../service/Axios";
import {
  setMenuList,
  setTRefreshToken,
  setToken,
  setUserDetails,
} from "../../../service/AuthMethods";

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (body, thunkAPI) => {
    try {
      const response = await apiClient.post(login, body);
      const token = response?.data?.access_token;
      const menuList = response?.data?.menu_list;
      const userDetail = response?.data?.user_details;
      setMenuList(menuList);
      setToken(token);
      setTRefreshToken(response?.data?.refresh_token);
      setUserDetails({
        name: userDetail?.name,
        job: userDetail?.job_id,
        questionPoolId: userDetail?.question_pool_id,
        role: userDetail?.role,
        email: userDetail?.email,
      });
      if (token) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
