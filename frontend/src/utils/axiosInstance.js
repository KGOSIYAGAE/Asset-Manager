import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

//Loacal HOST
//const BASE_URL = "http://localhost:3000/api/v1/asset-manager";

//NODE_ENV = 'development'
//NODE_ENV = 'production'

//Production
const BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1/asset-manager" : "http://localhost:3000/api/v1/asset-manager";

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

//Configure axios instance to automatically check for status if the token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
