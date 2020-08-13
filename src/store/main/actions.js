import { CHANGE_EDITABLE_CONTENT, UPDATE_USER } from "./actionNames";

export const updateUser = (data) => ({
  type: UPDATE_USER,
  data,
});
export const changeEditableContent = (data) => ({
  type: CHANGE_EDITABLE_CONTENT,
  data,
});
