import { UPDATE_USER } from "./actionNames";

const getInitialState = () => ({
  currentUser: {},
});

const userReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        currentUser: action.data,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
