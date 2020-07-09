const initialState = {
  words: null,
  isLoading: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "WORDS_LOADING_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "WORDS_LOADING_SUCCESS":
      return {
        ...state,
        isLoading: false,
        words: [{ ...action.payload }],
      };
    default:
      return state;
  }
};
