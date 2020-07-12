import React, { Component } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom'

function PrivateRoute({ component: Component, isAuth, ...rest }) {
  const history = useHistory();
  if (!isAuth) {
    return <Redirect to="/"/>
  }
  return <Component {...rest} />;
}

export default PrivateRoute;
