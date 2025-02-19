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
  //const accessToken = localStorage.getItem("token");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const accessToken = currentUser.token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

export default axiosInstance;
