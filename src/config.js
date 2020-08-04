/* eslint-disable default-case */
const envType = process.env.REACT_APP_ENV || process.env.NODE_ENV || "development";
const config = {
  apiUrl: "http://localhost:4000/api",
  baseURL: "http://localhost:4000"
};
switch (envType) {
  case "production":
    break;
  case "stage":
    break;
}
export default config;
