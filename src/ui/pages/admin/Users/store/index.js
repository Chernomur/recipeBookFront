import { UPDATE_ALL_USERS } from "./actionNames";

const getInitialState = () => ({
  users: [],
});

const userReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case UPDATE_ALL_USERS: {
      return {
        ...state,
        users: action.data.users,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
