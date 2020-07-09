import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Alert } from "evergreen-ui";
import { toaster } from "evergreen-ui";

const Register = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props.registerError !== null) {
      toaster.danger(props.registerError);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [props.registerError]);

  const onFormSubmit = (data) => {
    const email = watch("email");
    const password = watch("password");
    const repeatPassword = watch("repeatPassword");
    if (password !== repeatPassword) {
      return toaster.danger("Passwords do not match");
    }
    props.register({ email, password });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Form onSubmit={handleSubmit(onFormSubmit)} className="">
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            ref={register({ required: true })}
            type="email"
            id="email"
            placeholder="Enter email"
          />
          <p className={"text-danger"}>{errors.email && "Email is required"}</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={register({ required: true, min: 6 })}
            name="password"
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <p className={"text-danger"}>{errors.password && "6 symbols min"}</p>
        <Form.Group>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            ref={register({ required: true, min: 6 })}
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            placeholder="Repeat password"
          />
        </Form.Group>
        <Button type="submit" block>
          Register
        </Button>
      </Form>
      {/* {visible && (
        <Alert
          appearance="card"
          intent="danger"
          title={props.registerError}
          marginBottom={32}
        />
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    registerError: state.userData.registerError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (payload) => dispatch({ type: "REGISTER_REQUEST", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
