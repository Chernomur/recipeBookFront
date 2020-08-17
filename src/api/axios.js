import axios from "axios";
import { storage } from "utils";
import config from "config";

axios.defaults.baseURL = config.baseURL;

axios.interceptors.request.use((config) => {
  const token = storage.token.get();
  // console.log(config);
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  // console.log("token: ",token)
  // console.log("config: ", config);
  return config;
});

axios.interceptors.response.use(
  ({ data }) => {
    // console.log(data);
    return data;
  },
  (error) => {
    // console.log(error.response);
    return Promise.reject(error);
  }
);

export default axios;
