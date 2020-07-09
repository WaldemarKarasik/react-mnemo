import {
  takeLatest,
  take,
  takeEvery,
  takeLeading,
  all,
  fork,
  put,
  call,
  delay,
} from "redux-saga/effects";
import { getTokenResponse, getUser, login, register } from "../api/userApi";
import { userSchema } from "../normalizr";
import { normalize } from "normalizr";

function* getCurrentUserWorker() {
  yield put({ type: "USER_LOADING_STARTED" });
  const tokenResponse = yield call(getTokenResponse);

  if (tokenResponse.tokenValid) {
    const user = yield call(getUser, tokenResponse.token);
    yield put({ type: "USER_LOADING_FULFILLED" });
    // const normalizedData = normalize(user, userSchema);
    yield put({ type: "SET_USER", payload: user });
    console.log("getting user");
    if (user.words.length) {
      yield put({
        type: "ADD_TO_LEARN_SERVER_SIDE_SUCCESS",
        payload: user.words,
      });
    }
  } else {
    yield put({ type: "USER_LOADING_TOKEN_INVALID" });
  }
}

function* userLogoutWorker() {
  localStorage.setItem("auth-token", "");
  yield put({ type: "USER_LOADING_TOKEN_INVALID" });
  yield put({ type: "RESET_LIST" });
}

function* loginDataSentWorker(action) {
  yield put({ type: "SET_LOGIN_DATA", payload: action.payload });
}

function* watchLoginData() {
  const action = yield takeEvery("LOGIN_DATA_SENT", loginDataSentWorker);
}

function* loginWorker(action) {
  const loginData = action.payload;
  const loginResponse = yield call(login, loginData);
  if (loginResponse.message.msgError) {
    yield put({ type: "AUTH_ERROR", payload: loginResponse.message.msgBody });
    yield delay(2000);
    yield put({ type: "RESET_AUTH_ERROR" });
  } else {
    localStorage.setItem("auth-token", loginResponse.token);
    // const normalizedData = normalize(loginResponse.user, userSchema);
    yield put({ type: "SET_USER", payload: loginResponse.user });
    yield put({
      type: "ADD_TO_LEARN_CLIENT_SIDE_SUCCESS",
      payload: loginResponse.user.words,
    });
  }
}

function* loginWatcher() {
  yield takeLatest("LOGIN_REQUEST", loginWorker);
}

function* registerWorker(action) {
  const registerData = action.payload;
  const loginResponse = yield call(register, registerData);
  if (loginResponse.message.msgBody === "Logged in") {
    localStorage.setItem("auth-token", loginResponse.token);
    // const normalizedData = normalize(loginResponse.user, userSchema);
    yield put({ type: "SET_USER", payload: loginResponse.user });
  } else {
    yield put({
      type: "REGISTER_ERROR",
      payload: loginResponse.message.msgBody,
    });
    yield delay(2000);
    yield put({ type: "RESET_REGISTER_ERROR" });
  }
}

function* registerWatcher() {
  yield takeLatest("REGISTER_REQUEST", registerWorker);
}

export default function* AuthSaga() {
  yield takeLatest("GET_CURRENT_USER", getCurrentUserWorker);
  yield fork(watchLoginData);
  yield fork(loginWatcher);
  yield fork(registerWatcher);
  yield takeLatest("LOGOUT_USER", userLogoutWorker);
}
