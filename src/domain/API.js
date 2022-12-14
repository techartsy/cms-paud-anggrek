import _ from "lodash";
import request from "../utils/request";
const base_URL = "http://localhost:5000/api";

const urls = {
  login: "/admin/login",
  getAllStudent: '/student',
  fetchPayment: '/payment',
  fetchCertificate: '/certificate',
  // submitContact: "contact/order",
  // post_registration: "guest",
  // post_gift_confirmation: "gift",
};

const callAPI = (endpoint, method, headers = {}, params = {}, data = {}) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    const entededHeaders = {
      Authorization: `Bearer ${token}`
    }
    _.extend(headers, entededHeaders)
  }

  const options = {
    baseURL: base_URL,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const login = (userData) => {
  return callAPI(urls.login, "post", {}, {}, userData);
};

export const getAllStudent = () => {
  return callAPI(urls.getAllStudent, "get", {});
};

export const fetchPayment = () => {
  return callAPI(urls.fetchPayment, "get", {});
};

export const fetchCertificate = () => {
  return callAPI(urls.fetchCertificate, "get", {});
};
