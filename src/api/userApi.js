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

export default {
  editUser,
  editImgUpload,
};
