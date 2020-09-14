import axios from "./axios";

const path = "/recipe";

const filter = (sorting) => {
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
  return { sortField, sortOrder };
};

export const allRecipes = (arg) => {
  const { timeFrom, timeTo, difficulty, sorting, search } = arg;
  const { sortField, sortOrder } = filter(sorting);

  return axios.get(`${path}/`, {
    params: {
      difficulty,
      timeFrom,
      timeTo,
      search,
      sortField,
      sortOrder
    }
  });
};

export const favoriteRecipes = (arg) => {
  const { timeFrom, timeTo, difficulty, sorting, search } = arg;

  const { sortField, sortOrder } = filter(sorting);
  return axios.get(`${path}/favorites`, {
    params: {
      difficulty,
      timeFrom,
      timeTo,
      search,
      sortField,
      sortOrder
    }
  });
};

export const createRecipe = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return axios.post(`${path}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const editRecipe = (id, data) => {
  return axios.patch(`${path}/${id}`, data);
};
export const editImgUpload = (id, file) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("id", id);

  return axios.post(`${path}/upload`, fd, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getRecipe = (id) => {
  return axios.get(`${path}/${id}`);
};

export default {
  allRecipes,
  createRecipe,
  getRecipe,
  editRecipe,
  editImgUpload,
  favoriteRecipes
};
