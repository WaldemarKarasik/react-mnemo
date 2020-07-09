import React, {useEffect, useState} from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

const Login = ({ sendLoginData, loginError }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    if(loginError !== null) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
  },[loginError])
  const onFormSubmit = (data) => {
    sendLoginData(data)
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Form onSubmit={handleSubmit(onFormSubmit)} className="">
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            ref={register({required: true})}
            type="email"
            id="email"
            placeholder="Enter email"
          />
          <p className={"text-danger"}>{errors.email && "Email is required"}</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
              ref={register({required: true, min: 6})}
            name="password"
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <p className={"text-danger"}>{errors.password && "6 symbols min"}</p>
        <Button type="submit" block>
          Log in
        </Button>
      </Form>
      <Alert show={visible} variant="danger">
        <Alert.Heading>{loginError}</Alert.Heading>
      </Alert>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginError: state.userData.loginError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLoginData: (data) =>
      dispatch({ type: "LOGIN_DATA_SENT", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
