import { createStore, combineReducers, applyMiddleware } from "redux";
import { UserReducer } from "./reducers/UserReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./sagas/RootSaga";
import WordsReducer from "./reducers/WordsReducer";
import { compose } from "redux";
import { LearningListReducer } from "./reducers/LearningListReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  userData: UserReducer,
  words: WordsReducer,
  learningList: LearningListReducer,
});

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);
