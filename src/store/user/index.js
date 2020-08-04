import { ADD_USER } from "./actionNames";

const getInitialState = () => ({
  users: [{
    fullName: "Chernom-kun",
    email: "chernomur@gfgsfg"
  }]

});

const userReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [
          ...state.users, {
            id: null,
            fullName: action.fullName,
            email: action.email
          }
        ]
      };
    }
    default:
      return state;
  }
};

export default userReducer;
