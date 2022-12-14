import produce from "immer";
import {
  SET_IS_LOGIN,
  SET_ALL_STUDENT,
  SET_PAYMENT_RESPONSE,
  SET_CERTIFICATE,
} from "../constants/index";

export const initialState = {
  isLogin: null,
  students: [],
  payments: [],
  certificates: [],
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
      default:
        return state;
    }
  });

export default invitationState;
