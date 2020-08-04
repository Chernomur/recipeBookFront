import { ADD_RECIPE, GET_ALL_RECIPES } from "./actionNames";

export const addRecipe = (data) => ({
  type: ADD_RECIPE,
  data
});
export const GetAllRecipes = (data) => ({
  type: GET_ALL_RECIPES,
  data
});
