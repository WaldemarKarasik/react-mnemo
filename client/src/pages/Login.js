import React, { useEffect } from "react";
import LoginComponent from "../components/auth/LoginComponent";
import { connect } from "react-redux";

const Login = ({ loginData,login }) => {
  // useEffect(() => {
  //   if (loginData) {
  //     if (loginData.password.trim().length >= 6) {
  //       console.log("Greater or equal to 6");
  //     } else {
  //       //password too short
  //     }
  //   }
  // }, [loginData]);

  if (loginData) {
    if (loginData.password.trim().length >= 6) {
        login(loginData)
    } else {
      //password too short
      console.log("Too short to proceed");
    }
  }
  return <LoginComponent />;
};

const mapStateToProps = (state) => {
  return {
    loginData: state.userData.loginData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch({type: "LOGIN_REQUEST", payload})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
