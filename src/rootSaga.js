import { all } from "redux-saga/effects";

// import cmsSaga from "./sagas";
import authenticationSaga from './store/sagas/authenticationSaga';

export default function* rootSaga() {
  // yield all([cmsSaga()]);
  yield all([
    authenticationSaga()
  ]);
}
