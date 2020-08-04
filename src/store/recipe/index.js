import { ADD_RECIPE, GET_ALL_RECIPES } from "./actionNames";

const getInitialState = () => ({
  recipes: []
});

const recipeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_RECIPE: {
      return {
        ...state,
        recipes: [
          ...state.users, {
            id: null,
            title: action.fullName,
            overview: action.email
          }
        ]
      };
    }
    case GET_ALL_RECIPES: {
      return {
        ...state,
        recipes: action.data
      };
    }
    default:
      return state;
  }
};

export default recipeReducer;
