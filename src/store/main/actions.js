import {
  CHANGE_EDITABLE_CONTENT,
  SING_IN_USER
} from "./actionNames";

export const singInUser = (data) => ({
  type: SING_IN_USER,
  data
});
export const changeEditableContent = (data) => ({
  type: CHANGE_EDITABLE_CONTENT,
  data
});
