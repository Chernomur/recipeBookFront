import { ADD_USER, GET_ALL_USERS } from "./actionNames";

export const addUser = (data) => ({
  type: ADD_USER,
  data,
});
export const GetAllUsers = (data) => ({
  type: GET_ALL_USERS,
  data,
});
