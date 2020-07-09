const initialState = {
  user: undefined,
  userLoading: false,
  isAuthenticated: false,
  loginData: undefined,
  loginError: null,
  registerError: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING_TOKEN_INVALID": {
      return {
        ...state,
        user: null,
        userLoading: false,
        isAuthenticated: false,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loginData: undefined,
      };
    }
    case "SET_LOGIN_DATA": {
      return {
        ...state,
        loginData: action.payload,
      };
    }
    case "AUTH_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    case "REGISTER_ERROR": {
      return {
        ...state,
        registerError: action.payload,
      };
    }
    case "RESET_AUTH_ERROR":
      return {
        ...state,
        loginError: null,
      };
    case "RESET_REGISTER_ERROR":
      return {
        ...state,
        registerError: null,
      };
    default:
      return state;
  }
};
