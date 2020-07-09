import { createSelector } from "reselect";

const getUser = (state) => {
  return state.userData.user;
};

export const getUserSelector = createSelector(getUser, (user) => {
  return user;
});

const getUserWords = (state) => {
  return state.userData.user;
};

export const getUserWordsArraySelector = createSelector(getUser, (user) => {
  if (user) {
    return user.words.map((word) => word);
  }
});

const getUserWordsSelector = createSelector(
  getUserWordsArraySelector,
  (wordsArray) => {}
);
