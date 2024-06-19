import _ from "axios";
import Cookies from "js-cookie";
const baseUrl = "http://localhost:9080/api/v1";

const axios = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});


export const AuthApi = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export default axios;
