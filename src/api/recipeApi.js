import axios from "./axios";

const path = "/recipe";

export const allRecipe = () => {
  return axios.get(`${path}/`);
};

export default {
  allRecipe,
};
