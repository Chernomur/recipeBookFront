import axios from "./axios";

const path = "/auth";

export const authCheck = () => {
  return axios.get(`${path}/check`);
};
export const singIn = (data) => {
  return axios.post(`${path}/singIn`, data);
};
export const singUp = (data) => {
  return axios.post(`${path}/singUp`, data);
};

export default {
  authCheck,
  singIn,
  singUp,
};
