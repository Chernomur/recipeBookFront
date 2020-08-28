import { ADD_RECIPE, UPDATE_ALL_RECIPES } from "./actionNames";

export const addRecipe = (data) => ({
  type: ADD_RECIPE,
  data,
});
export const GetAllRecipes = (data) => ({
  type: UPDATE_ALL_RECIPES,
  data,
});
