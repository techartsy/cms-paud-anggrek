import _ from "lodash";
import request from "../utils/request";
const base_URL = "http://localhost:5000/api";

const urls = {
  login: "/admin/login",
  getAllStudent: '/student',
  fetchPayment: '/payment',
  fetchCertificate: '/certificate',
  removeCertificate: '/certificate/delete',
  fetchTeacher: '/teacher',
  createTeacher: '/teacher/register',
  removeTeacher: '/teacher/delete',
  fetchGallery: '/gallery',
  createGallery: '/gallery/create',
  removeGallery: '/gallery/delete',
  fetchArticle: '/article',
  createArticle: '/article/create',
  removeArticle: '/article/delete',
  updatePayment: '/payment/update',
  removePayment: '/payment/delete',
  fetchTestimony: '/testimony',
  removeTestimony: '/testimony/delete',
  fetchAssessment: '/assessment',
  removeAssessment: '/assessment/delete',
  removeStudent: '/student/delete',
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

export const fetchTeacher = () => {
  return callAPI(urls.fetchTeacher, "get", {});
};

export const createTeacher = (teacher) => {
  return callAPI(urls.createTeacher, "post", {}, {}, teacher);
};

export const removeTeacher = (teacher) => {
  return callAPI(`${urls.removeTeacher}/${teacher.id}`, "delete", {});
};

export const fetchGallery = () => {
  return callAPI(urls.fetchGallery, "get", {});
};

export const createGallery = (gallery) => {
  return callAPI(urls.createGallery, "post", {}, {}, gallery);
};

export const removeGallery = (gallery) => {
  return callAPI(`${urls.removeGallery}/${gallery.id}`, "delete", {});
};

export const fetchArticle = () => {
  return callAPI(urls.fetchArticle, "get", {});
};

export const createArticle = (gallery) => {
  return callAPI(urls.createArticle, "post", {}, {}, gallery);
};

export const removeArticle = (article) => {
  return callAPI(`${urls.removeArticle}/${article.id}`, "delete", {});
};

export const updatePayment = ( value ) => {
  const newObj = {
    status: value.status
  }
  return callAPI(`${urls.updatePayment}/${value.id}`, "put", {}, {}, newObj);
};

export const fetchTestimony = () => {
  return callAPI(urls.fetchTestimony, "get", {});
};

export const removeTestimony = (testimony) => {
  return callAPI(`${urls.removeTestimony}/${testimony.id}`, "delete", {});
};

export const removePayment = (payment) => {
  return callAPI(`${urls.removePayment}/${payment.id}`, "delete", {});
};

export const fetchAssessment = () => {
  return callAPI(urls.fetchAssessment, "get", {});
};

export const removeAssessment = (assessment) => {
  return callAPI(`${urls.removeAssessment}/${assessment.id}`, "delete", {});
};

export const removeCertificate = (certificate) => {
  return callAPI(`${urls.removeCertificate}/${certificate.id}`, "delete", {});
};

export const removeStudent = (student) => {
  return callAPI(`${urls.removeStudent}/${student.id}`, "delete", {});
};
