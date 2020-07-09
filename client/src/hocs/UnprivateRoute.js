import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const UnprivateRoute = ({ component: Component, user, ...rest }) => {
  return <Component {...rest} />;
};

export default UnprivateRoute;
