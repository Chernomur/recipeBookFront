import { combineReducers } from "redux";

import recipe from "./recipe";
import user from "./user";

export default combineReducers({
  user,
  recipe
});
