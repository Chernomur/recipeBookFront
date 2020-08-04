import axios from "axios";
import config from "../config";

axios.defaults.baseURL = config.baseURL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(({ data }) => {
  // console.log("response", response);

  return data;
}, (error) => {
  // console.log("reject",error.response.status);
  // if (error.response.status === 404)
  return Promise.reject(error);
});

export default axios;
