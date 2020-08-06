import axios from "axios";
import { storage } from "utils";
import config from "config";

axios.defaults.baseURL = config.baseURL;

axios.interceptors.request.use((config) => {
  const token = storage.token.get();
  // console.log(config);
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(({ data }) => {
  return data;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
