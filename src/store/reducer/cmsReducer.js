import produce from "immer";
import {
  SET_IS_LOGIN,
  SET_ALL_STUDENT,
  SET_PAYMENT_RESPONSE,
  SET_CERTIFICATE,
  SET_TEACHER,
  SET_REMOVE_TEACHER,
  SET_GALLERY,
  SET_REMOVE_GALLERY,
  SET_ARTICLE,
  SET_REMOVE_ARTICLE,
  SET_PAYMENT_STATUS,
  SET_TESTIMONY,
  SET_REMOVE_TESTIMONY,
  SET_REMOVE_PAYMENT,
  SET_ASSESSMENT,
  SET_REMOVE_ASSESSMENT,
  SET_REMOVE_CERTIFICATE,
  SET_REMOVE_STUDENT,
} from "../constants/index";

export const initialState = {
  isLogin: null,
  students: [],
  payments: [],
  certificates: [],
  teachers: [],
  galleries: [],
  articles: [],
  testimonies: [],
  assessments: [],
};

const invitationState = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_IS_LOGIN:
        draft.isLogin = action.value;
        break;
      case SET_ALL_STUDENT:
        draft.students = action.students;
        break;
      case SET_PAYMENT_RESPONSE:
        draft.payments = action.response;
        break;
      case SET_CERTIFICATE:
        draft.certificates = action.response;
        break;
      case SET_TEACHER:
        draft.teachers = action.response;
        break;
      case SET_REMOVE_TEACHER:
        let teachers = draft.teachers;
        let newTeachers = teachers.filter((item) => {
          return item.id !== action.teacher.id
        })
        draft.teachers = newTeachers;
        break;
      case SET_GALLERY:
        draft.galleries = action.response;
        break;
      case SET_REMOVE_GALLERY:
        let galleries = draft.galleries;
        let newGalleries = galleries.filter((item) => {
          return item.id !== action.gallery.id
        })
        draft.galleries = newGalleries;
        break;
      case SET_ARTICLE:
        draft.articles = action.response;
        break;
      case SET_REMOVE_ARTICLE:
        let articles = draft.articles;
        let newArticles = articles.filter((item) => {
          return item.id !== action.article.id
        })
        draft.articles = newArticles;
        break;
      case SET_TESTIMONY:
        draft.testimonies = action.response;
        break;
      case SET_REMOVE_TESTIMONY:
        let testimonies = draft.testimonies;
        let newTestimonies = testimonies.filter((item) => {
          return item.id !== action.testimony.id
        })
        draft.testimonies = newTestimonies;
        break;
      case SET_REMOVE_PAYMENT:
        let payments = draft.payments;
        let newPayments = payments.filter((item) => {
          return item.id !== action.payment.id
        })
        draft.payments = newPayments;
        break;
      case SET_ASSESSMENT:
        draft.assessments = action.response;
        break;
      case SET_REMOVE_ASSESSMENT:
        let assessments = draft.assessments;
        let newAssessments = assessments.filter((item) => {
          return item.id !== action.assessment.id
        })
        draft.assessments = newAssessments;
        break;
      case SET_REMOVE_CERTIFICATE:
        let certificates = draft.certificates;
        let newCertificates = certificates.filter((item) => {
          return item.id !== action.certificate.id
        })
        draft.certificates = newCertificates;
        break;
      case SET_REMOVE_STUDENT:
        let students = draft.students;
        let newStudents = students.filter((item) => {
          return item.id !== action.student.id
        })
        draft.students = newStudents;
        break;
      default:
        return state;
    }
  });

export default invitationState;
