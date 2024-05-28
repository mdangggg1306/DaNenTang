// api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_IP } from "./config";

const api = axios.create({
  baseURL: SERVER_IP,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const res = await axios.post(`${SERVER_IP}/refresh-token`, {
        token: refreshToken,
      });
      if (res.status === 200) {
        await AsyncStorage.setItem("token", res.data.token);
        api.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
