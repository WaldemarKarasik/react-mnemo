import Axios from "axios";
export const getTokenResponse = async () => {
  let token = localStorage.getItem("auth-token");

  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
  }
  const tokenResponse = await Axios.post("/users/tokenIsValid", null, {
    headers: {
      "x-auth-token": token,
    },
  });
  if (tokenResponse.data === true) {
    const userResponse = await Axios.post("/users/", null, {
      headers: {
        "x-auth-token": token,
      },
    });
  }
  return { token, tokenValid: tokenResponse.data };
};

export const getUser = async (token) => {
  const userResponse = await Axios.post("/users/", null, {
    headers: {
      "x-auth-token": token,
    },
  });
  return userResponse.data;
};

export const login = async (loginData) => {
  const token = localStorage.getItem("auth-token");
  try {
    const loginResponse = await Axios.post("/users/login", loginData, {
      headers: {
        "x-auth-token": token,
      },
    });
    return loginResponse.data;
  } catch (e) {
    return e.message;
  }
};

export const register = async (registerData) => {
  try {
    const registerResponse = await Axios.post("/users/register", registerData, {
      headers: {},
    });
    return registerResponse.data;
  } catch (e) {
    console.log(e);
  }
};

export const addToLearn = async (name) => {
  const token = localStorage.getItem("auth-token");
  try {
    const addWordResponse = await Axios.post("/users/learn-word", name, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(addWordResponse);
    return addWordResponse.data;
  } catch (e) {
    console.log(e);
  }
};
