import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { LoadingService } from "./loadingService";

//Loacal HOST
//const BASE_URL = "http://localhost:3000/api/v1/asset-manager";

//NODE_ENV = 'development'
//NODE_ENV = 'production'

//Production
//const BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1/asset-manager" : `http://192.168.8.4:3000/api/v1/asset-manager`;

const BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1/asset-manager" : `http://10.90.1.25:3000/api/v1/asset-manager`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  //const accessToken = localStorage.getItem("token");

  let accessToken = null;

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const tempSign = JSON.parse(sessionStorage.getItem("temp-sign-token"));

  if (currentUser) {
    accessToken = currentUser.token;
  } else {
    accessToken = tempSign.token;
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (config.showSpinner) {
    LoadingService.show();
  }

  return config;
}),
  (error) => {
    LoadingService.hide();
    return Promise.reject(error);
  };

//Configure axios instance to automatically check for status if the token
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.showSpinner) {
      LoadingService.hide();
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      LoadingService.hide();
      sessionStorage.clear();
      window.location.href = "/";
    }
    LoadingService.hide();
    return Promise.reject(error);
  },
);

export default axiosInstance;
