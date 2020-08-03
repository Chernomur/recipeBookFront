import { v4 as uuidv4 } from "uuid4";
import { ADD_RECIPE } from "./actionNames";

const getInitialState = () => ({
  recipes: [{
    title: "Фаршированные шляпки шампиньонов курицей",
    overview: "Невероятно вкусный рецепт — Фаршированные шляпки шампиньонов с куриным филе и сыром  — от нашего постоянного автора Ирины Калининой.",
    difficulty: "5/10",
    cookingTime: "32min"
  }]

});

const recipeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_RECIPE: {
      return {
        ...state,
        recipes: [
          ...state.users, {
            id: uuidv4(),
            title: action.fullName,
            overview: action.email
          }
        ]
      };
    }
    default:
      return state;
  }
};

export default recipeReducer;
