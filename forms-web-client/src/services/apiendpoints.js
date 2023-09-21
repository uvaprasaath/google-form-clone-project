import axiosInstance from './axiosinstance';

export const apiPost = (url, data) => axiosInstance.post(url, data);
export const apiGet = (url) => axiosInstance.get(url);
export const apiPut = (url, data) => axiosInstance.put(url, data);
export const apiDelete = (url) => axiosInstance.delete(url);


