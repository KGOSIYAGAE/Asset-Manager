import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");

  console.log(accessToken.toString());

  if (accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

export default axiosInstance;
