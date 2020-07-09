import {
  takeLatest,
  call,
  takeEvery,
  take,
  put,
  fork,
} from "redux-saga/effects";
import { getGenericWords } from "../api/wordsApi";
import { normalize } from "normalizr";
import { addToLearn } from "../api/userApi";
import { wordSchema } from "../normalizr";

function* addToLearnWorker(action) {
  const data = { name: action.payload };
  const addWordResponse = yield call(addToLearn, data);
  if (addWordResponse.msg && addWordResponse.msg.msgError) {
    alert("you already learn this word");
  } else {
    yield put({ type: "ADD_TO_LEARN_SUCCESS", payload: addWordResponse });
  }
}

function* WordsWorker() {
  yield put({ type: "WORDS_LOADING_PENDING" });
  const words = yield call(getGenericWords);
  console.log(words);
  // const normalizedWords = normalize(words, wordSchema)
  // console.log(normalizedWords)
  yield put({ type: "WORDS_LOADING_SUCCESS", payload: words });
}

export default function* WordsSaga() {
  yield takeLatest("GET_WORDS", WordsWorker);
  yield takeEvery("ADD_TO_LEARN_REQUEST", addToLearnWorker);
}
