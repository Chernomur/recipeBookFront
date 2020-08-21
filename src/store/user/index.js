import { ADD_USER, GET_ALL_USERS } from "./actionNames";

const getInitialState = () => ({
  users: [],
});

const userReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: null,
            fullName: action.fullName,
            email: action.email,
          },
        ],
      };
    }
    case GET_ALL_USERS: {
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
