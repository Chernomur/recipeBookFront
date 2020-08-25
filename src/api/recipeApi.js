import axios from "./axios";

const path = "/recipe";

export const allRecipe = (arg) => {
  const { timeFrom, timeTo, difficulty, sorting, search } = arg;
  let sortField;
  let sortOrder;
  if (sorting === "▲Time cooking") {
    sortField = "cookingTime";
    sortOrder = "asc";
  }
  if (sorting === "▼Time cooking") {
    sortField = "cookingTime";
    sortOrder = "desc";
  }
  if (sorting === "▲Cooking difficulty") {
    sortField = "difficulty";
    sortOrder = "asc";
  }
  if (sorting === "▼Cooking difficulty") {
    sortField = "difficulty";
    sortOrder = "desc";
  }
  if (sorting === "▲Alphabetical") {
    sortField = "title";
    sortOrder = "asc";
  }
  if (sorting === "▼Alphabetical") {
    sortField = "title";
    sortOrder = "desc";
  }

  return axios.get(
    `${path}/?&difficulty=${difficulty}&timeFrom=${timeFrom}&timeTo=${timeTo}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`
  );
};

export const getRecipe = (id) => {
  return axios.get(`${path}/${id}`);
};
export default {
  allRecipe,
  getRecipe,
};
