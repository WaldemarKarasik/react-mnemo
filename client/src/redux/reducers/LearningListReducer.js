const initialState = {
  words: [],
};

export const LearningListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_LEARN_SUCCESS": {
      return {
        ...state,
        words: [action.payload],
      };
    }
    case "ADD_TO_LEARN_CLIENT_SIDE_SUCCESS": {
      return {
        ...state,
        words: [action.payload],
      };
    }
    case "ADD_TO_LEARN_SERVER_SIDE_SUCCESS": {
      return {
        ...state,
        words: [action.payload],
      };
    }
    case "RESET_LIST": {
      return {
        ...state,
        words: [],
      };
    }
    default:
      return state;
  }
};
