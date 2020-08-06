import {
  SING_IN_USER
} from "./actionNames";

const getInitialState = () => ({
  authorisedUser: {}
});

const mainReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SING_IN_USER: {
      return {
        ...state,
        authorisedUser: {
          // eslint-disable-next-line no-underscore-dangle
          id: action.data._id,
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
