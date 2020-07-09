import React, { Component } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function PrivateRoute({ component: Component, isAuth, ...rest }) {
  const history = useHistory();
  if (!isAuth) {
    return history.push("/");
  }
  return <Component {...rest} />;
}

export default PrivateRoute;
