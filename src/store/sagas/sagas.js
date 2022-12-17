import { call, put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  LOGIN,
  GET_ALL_STUDENT,
  FETCH_PAYMENT,
  FETCH_CERTIFICATE,
  FETCH_TEACHER,
  ADD_TEACHER,
  REMOVE_TEACHER,
  FETCH_GALLERY,
  CREATE_GALLERY,
  REMOVE_GALLERY,
  FETCH_ARTICLE,
  CREATE_ARTICLE,
  REMOVE_ARTICLE,
  UPDATE_PAYMENT_STATUS,
  FETCH_TESTIMONY,
  REMOVE_TESTIMONY,
  REMOVE_PAYMENT,
  FETCH_ASSESSMENT,
  REMOVE_ASSESSMENT,
  REMOVE_CERTIFICATE,
  REMOVE_STUDENT,
} from '../constants';
import {
  login,
  getAllStudent,
  fetchPayment,
  fetchCertificate,
  fetchTeacher,
  createTeacher,
  removeTeacher,
  fetchGallery,
  createGallery,
  removeGallery,
  createArticle,
  fetchArticle,
  removeArticle,
  updatePayment,
  fetchTestimony,
  removeTestimony,
  removePayment,
  fetchAssessment,
  removeAssessment,
  removeCertificate,
  removeStudent,
} from "../../domain/API";
import {
  setIsLogin,
  setAllStudents,
  setPaymentResponse,
  setCertificate,
  setTeacher,
  setRemoveTeacher,
  setGallery,
  setRemoveGallery,
  setArticle,
  setRemoveArticle,
  setPaymentStatus,
  setTestimony,
  setRemoveTestimony,
  setRemovePayment,
  setAssessment,
  setRemoveAssessment,
  setRemoveCertificate,
  setRemoveStudent,
} from "../action/action";

function* doLogin({ userData, cb }) {
  try {
    const response = yield call(login, userData);
    if (response) {
      localStorage.setItem('access_token', response.access_token);
      yield put(setIsLogin(true));
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      console.log('masuk 401')
      cb && cb(err?.response?.data?.message);
    }
    console.log(err.response, '<<<< error');
    console.log(err);
  }
}

function* doFetchStudent() {
  try {
    const response = yield call(getAllStudent);
    if (response) {
      const { students } = response.data;
      yield put(setAllStudents(students))
    }
    // console.log(response, '<<<< response');
  } catch (error) {
    console.log(error);
  }
}

function* doFetchPayment() {
  try {
    const response = yield call(fetchPayment);
    if (response) {
      const { payments } = response.data;
      yield put(setPaymentResponse(payments))
    }
  } catch (error) {
    console.log(error);
  }
}

function* doFetchCertificate() {
  try {
    const response = yield call(fetchCertificate);
    if (response) {
      const { certificates } = response.data;
      yield put(setCertificate(certificates))
    }
  } catch (error) {
    console.log(error);
  }
}

function* doFetchTeacher() {
  try {
    const response = yield call(fetchTeacher);
    if (response) {
      const { teachers } = response.data;
      yield put(setTeacher(teachers))
    }
  } catch (error) {
    console.log(error);
  }
}

function* doCreateTeacher({ teacher, cbSuccess, cbFailed }) {
  try {
    const response = yield call(createTeacher, teacher);
    if (response) {
      cbSuccess && cbSuccess();
    }
  } catch (error) {
    if (error.response.status === 400) {
      cbFailed && cbFailed(error.response.data.message)
    } else {
      cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
    }
  }
}

function* doRemoveTeacher({ teacher, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeTeacher, teacher);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveTeacher(teacher))
    }
  } catch (error) {
    if (error.response.status === 400) {
      cbFailed && cbFailed(error.response.data.message)
    } else {
      cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
    }
  }
}

function* doFetchGallery() {
  try {
    const response = yield call(fetchGallery);
    if (response) {
      const { galleries } = response.data;
      yield put(setGallery(galleries))
    }
    // console.log(response, '<<<< response');
  } catch (error) {
    console.log(error);
  }
}

function* doCreateGallery({ gallery, cbSuccess, cbFailed }) {
  try {
    const response = yield call(createGallery, gallery);
    if (response) {
      cbSuccess && cbSuccess();
    }
  } catch (error) {
      cbFailed && cbFailed()
  }
}

function* doRemoveGallery({ gallery, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeGallery, gallery);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveGallery(gallery))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

function* doFetchArticle() {
  try {
    const response = yield call(fetchArticle);
    if (response) {
      const { articles } = response.data;
      yield put(setArticle(articles))
    }
  } catch (error) {
    console.log(error);
  }
}

function* doCreateArticle({ article, cbSuccess, cbFailed }) {
  try {
    const response = yield call(createArticle, article);
    if (response) {
      cbSuccess && cbSuccess();
    }
  } catch (error) {
      cbFailed && cbFailed()
  }
}

function* doRemoveArticle({ article, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeArticle, article);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveArticle(article))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

function* doUpdatePaymentStatus({ payment, value, cbSuccess, cbFailed }) {
  try {
    const data = {
      id: payment.id,
      status: value.status
    }
    const response = yield call(updatePayment, data);
    console.log(response, '<<< repsonse saga');
    if (response.status === 'Success') {
      const response = yield call(fetchPayment);
      if (response) {
        const { payments } = response.data;
        yield put(setPaymentResponse(payments))
      }
      cbSuccess && cbSuccess()
    }
  } catch (error) {
    console.log('Masuk Catch');
    cbFailed && cbFailed();
  }
}

function* doFetchTestimony() {
  try {
    const response = yield call(fetchTestimony);
    if (response) {
      const { testimonies } = response.data;
      yield put(setTestimony(testimonies))
    }
  } catch (error) {
    console.log(error);
  }
}

function* doRemoveTestimony({ testimony, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeTestimony, testimony);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveTestimony(testimony))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

function* doRemovePayment({ payment, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removePayment, payment);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemovePayment(payment))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

function* doFetchAssessment() {
  try {
    const response = yield call(fetchAssessment);
    if (response) {
      const { assessments } = response.data;
      yield put(setAssessment(assessments))
    }
  } catch (error) {
    console.log(error);
  }
}

function* doRemoveAssessment({ assessment, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeAssessment, assessment);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveAssessment(assessment))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

function* doRemoveCertificate({ certificate, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeCertificate, certificate);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveCertificate(certificate))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

function* doRemoveStudent({ student, cbSuccess, cbFailed }) {
  try {
    const response = yield call(removeStudent, student);
    if (response) {
      cbSuccess && cbSuccess();
      yield put(setRemoveStudent(student))
    }
  } catch (error) {
    cbFailed && cbFailed('Maaf, terjadi kesalahan pada sistem. Silakan coba lagi')
  }
}

export default function* sagas() {
  yield takeLatest(LOGIN, doLogin);
  yield takeLatest(GET_ALL_STUDENT, doFetchStudent);
  yield takeLatest(FETCH_PAYMENT, doFetchPayment);
  yield takeLatest(FETCH_CERTIFICATE, doFetchCertificate);
  yield takeLatest(FETCH_TEACHER, doFetchTeacher);
  yield takeLatest(ADD_TEACHER, doCreateTeacher);
  yield takeLatest(REMOVE_TEACHER, doRemoveTeacher);
  yield takeLatest(FETCH_GALLERY, doFetchGallery);
  yield takeLatest(CREATE_GALLERY, doCreateGallery);
  yield takeLatest(REMOVE_GALLERY, doRemoveGallery);
  yield takeLatest(FETCH_ARTICLE, doFetchArticle);
  yield takeLatest(CREATE_ARTICLE, doCreateArticle);
  yield takeLatest(REMOVE_ARTICLE, doRemoveArticle);
  yield takeLatest(UPDATE_PAYMENT_STATUS, doUpdatePaymentStatus);
  yield takeLatest(FETCH_TESTIMONY, doFetchTestimony);
  yield takeLatest(REMOVE_TESTIMONY, doRemoveTestimony);
  yield takeLatest(REMOVE_PAYMENT, doRemovePayment);
  yield takeLatest(FETCH_ASSESSMENT, doFetchAssessment);
  yield takeLatest(REMOVE_ASSESSMENT, doRemoveAssessment);
  yield takeLatest(REMOVE_CERTIFICATE, doRemoveCertificate);
  yield takeLatest(REMOVE_STUDENT, doRemoveStudent);
}
