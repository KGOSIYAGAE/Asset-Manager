import axios from "axios";

//const BASE_URL = "http://localhost:3000/api/v1/asset-manager/admin";
//Production
const BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1/asset-manager/admin" : "http://localhost:3000/api/v1/asset-manager/admin";

const loginAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*Loading spinner Logic
const {showSpinner, hideSpinner} =useLoading()


loginAxiosInstance.interceptors.request.use((config) => {
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
  };*/

export default loginAxiosInstance;
