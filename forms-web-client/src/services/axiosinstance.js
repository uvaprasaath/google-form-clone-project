import axios from 'axios';
import { clearStorage, getToken, setToken } from '../utils';
import { authUrl } from '../utils/datasource';

const axiosInstance = axios.create({
  baseURL: authUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("the eorofhekkyucc chckbcbe ckgce dvd f")
      try {
        const refreshResponse = await axiosInstance.post('/token', {
          refreshToken: getToken().refreshToken,
        });
        console.log("the refreshResponse",refreshResponse.status)
        const newAccessToken = refreshResponse.data.token.accessToken;
        setToken(refreshResponse.data.token)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        let response = await axiosInstance(originalRequest);
        return response;
      } catch (refreshError) {
        console.log("the response is ",refreshError)
        if (refreshError.response.status === 417) {
          clearStorage();
        }
        clearStorage();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
