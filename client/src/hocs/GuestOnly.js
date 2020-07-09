import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default (WrappedComponent) => {
  class GuestOnly extends React.Component {
    constructor(props) {
      super(props);
      this.isAuthenticated = this.props.isAuthenticated;
    }
    render() {
      if (this.isAuthenticated === false) {
        return <WrappedComponent />;
      } else {
        return <Redirect to="/" />;
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.userData.isAuthenticated,
    };
  };
  return connect(mapStateToProps)(GuestOnly);
};
