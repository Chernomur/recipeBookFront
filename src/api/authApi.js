import axios from "./axios";

const path = "/auth";

export const authCheck = () => {
  return axios.get(`${path}/check`);
};

export default {
  authCheck
};
