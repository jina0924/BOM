import axios from "axios";

import ls from "../helper/LocalStorage";

axios.defaults.withCredentials = true;

const NurseApi = axios.create({
  baseURL: "https://thundervolt.co.kr/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

NurseApi.interceptors.request.use(
  (config) => {
    const accessToken = ls.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default NurseApi;
