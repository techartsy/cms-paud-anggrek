import { call, put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  LOGIN,
  GET_ALL_STUDENT,
  FETCH_PAYMENT,
  FETCH_CERTIFICATE,
} from '../constants';
import {
  login,
  getAllStudent,
  fetchPayment,
  fetchCertificate,
  // getAllGuest,
  // postRegistration,
  // postGiftConfirmation,
} from "../../domain/API";
import {
  setIsLogin,
  setAllStudents,
  setPaymentResponse,
  setCertificate,
} from "../action/action";

// function* doGetAllGuest() {
//   try {
//     const guestsData = yield call(getAllGuest);
//     const messages = guestsData?.guests.filter((item) => {
//       return !_.isEmpty(item.message);
//     });
//     yield put(setMessages(messages.reverse()));
//     yield put(setGuests(guestsData.guests));
//   } catch (error) {
//     console.log(error);
//   }
// }

// function* doPostRegistration({ guestData, cbError, cbSuccess }) {
//   try {
//     const newData = yield call(postRegistration, guestData);
//     if (newData) {
//       cbSuccess && cbSuccess();
//       yield put(setNewGuest(newData));
//     }
//   } catch (error) {
//     if (error?.response?.status === 400) {
//       const message = error?.response?.data?.message;
//       cbError && cbError(message);
//     } else {
//       cbError && cbError();
//     }
//   }
// }

// function* doGiftConfirmation({ userData }) {
//   try {
//     const confirmationResponse = yield call(postGiftConfirmation, userData);
//     if (confirmationResponse) {
//       yield put(setConfirmationSuccess());
//     }
//   } catch (error) {
//     if (error.response.status === 400) {
//       yield put(setConfirmationError(error.response.data.message));
//     }
//   }
// }

function* doLogin({userData}) {
  try {
    console.log(userData, '<<< userData saga')
    const response = yield call(login, userData);
    if (response) {
      localStorage.setItem('access_token', response.access_token);
      yield put(setIsLogin(true));
    }
    console.log(response, '<<< response');
  } catch (err) {
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
    // console.log(response, '<<<< response');
  } catch (error) {
    console.log(error);
  }
}

function* doFetchCertificate() {
  try {
    const response = yield call(fetchCertificate);
    if (response) {
      const { certificates } = response.data;
      console.log(certificates);
      yield put(setCertificate(certificates))
    }
    // console.log(response, '<<<< response');
  } catch (error) {
    console.log(error);
  }
}

export default function* authenticationSaga() {
  yield takeLatest(LOGIN, doLogin);
  yield takeLatest(GET_ALL_STUDENT, doFetchStudent);
  yield takeLatest(FETCH_PAYMENT, doFetchPayment);
  yield takeLatest(FETCH_CERTIFICATE, doFetchCertificate);
  // yield takeLatest(POST_REGISTRATION, doPostRegistration);
  // yield takeLatest(POST_GIFT_CONFIRMATION, doGiftConfirmation);
}
