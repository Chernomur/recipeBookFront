import axios from "./axios";

const path = "/user";

export const editUser = (id, data) => {
  return axios.patch(`${path}/${id}`, data);
};
export const editImgUpload = ({ file }) => {
  return axios.post(`${path}/upload`, file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getUser = (id) => {
  return axios.get(`${path}/${id}`);
};

export const allUsers = (arg) => {
  const { currentPage, rowsCount, orderBy, order } = arg;
  return axios.get(
    `${path}/?orderby=${orderBy}&order=${order}&page=${currentPage}&size=${rowsCount}`
  );
};

export default {
  editUser,
  editImgUpload,
  getUser,
  allUsers,
};
