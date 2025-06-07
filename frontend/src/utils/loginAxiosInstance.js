import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/asset-manager/admin";

const loginAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default loginAxiosInstance;
