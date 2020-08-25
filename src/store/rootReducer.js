import { combineReducers } from "redux";

import recipe from "../ui/pages/Recipes/store";
import user from "../ui/pages/admin/Users/store";
import main from "./main";

export default combineReducers({
  main,
  user,
  recipe,
});
