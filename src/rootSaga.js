import { all } from "redux-saga/effects";

import cmsSaga from './store/sagas/sagas';

export default function* rootSaga() {
  yield all([
    cmsSaga()
  ]);
}
