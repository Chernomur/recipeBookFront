import * as axios from "axios";

export default () => {
  const token = localStorage.getItem("token");

  axios.interceptors.request.use((config) => {
    // console.log("request", config);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }
    return config;
  }, (error) => {
    // console.log("reject",error);
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    // console.log("response", response);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response;
  }, (error) => {
    // console.log("reject",error.response.status);
    // if (error.response.status === 404)
    return Promise.reject(error);
  });
};
