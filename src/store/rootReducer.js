import { combineReducers } from "redux";

import recipe from "./recipe";
import user from "./user";
import main from "./main";

export default combineReducers({
  main,
  user,
  recipe
});
