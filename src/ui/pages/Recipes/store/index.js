import { ADD_RECIPE, UPDATE_ALL_RECIPES } from "./actionNames";

const getInitialState = () => ({
  recipes: [],
});

const recipeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_RECIPE: {
      return {
        ...state,
        recipes: [
          ...state.users,
          {
            title: action.fullName,
            description: action.email,
          },
        ],
      };
    }
    case UPDATE_ALL_RECIPES: {
      return {
        ...state,
        recipes: action.data,
      };
    }
    default:
      return state;
  }
};

export default recipeReducer;
