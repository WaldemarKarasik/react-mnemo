import AuthSaga from "./AuthSaga";
import WordsSaga from "./WordsSaga";
import { all } from "redux-saga/effects";
export default function* RootSaga() {
  yield all([AuthSaga(), WordsSaga()]);
}
