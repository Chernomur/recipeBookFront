import { SING_IN_USER } from "./actionNames";

const getInitialState = () => ({
  authorisedUser: {
    id: null,
    role: null,
    fullName: null,
    email: null
  }

});

const mainReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SING_IN_USER: {
      return {
        ...state,
        authorisedUser: {
          id: action.data.id,
          role: action.data.role,
          fullName: action.data.fullName,
          email: action.data.email
        }
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
