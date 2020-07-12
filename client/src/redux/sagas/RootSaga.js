import AuthSaga from "./AuthSaga";
import WordsSaga from "./WordsSaga";
import { all, fork, call } from "redux-saga/effects";
export default function* RootSaga() {
  yield all([AuthSaga(), WordsSaga()]);
  
}
