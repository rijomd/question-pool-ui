import axios from "axios";
import { getToken } from "./AuthMethods";

const apiClient = axios.create({
  baseURL: "http://localhost:8086/api",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    withCredentials: true,
  },
});

export default apiClient;
