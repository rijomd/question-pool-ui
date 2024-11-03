import { useEffect } from "react";
import axios from "../service/Axios";

const useAxiosWithToken = () => {
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        return () => { axios.interceptors.request.eject(requestInterceptor); };
    }, [token]);
    return axios;
};

export default useAxiosWithToken;
