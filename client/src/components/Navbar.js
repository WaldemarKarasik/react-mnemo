import React from "react";
import {
  Navbar as NavBar,
  Form,
  FormControl,
  Nav,
  Button,
} from "react-bootstrap";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
function Navbar({ user, logout, isAuthenticated }) {
  const dispatch = useDispatch();
  const authenticatedLinks = () => {
    return (
      <>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link as={Link} to="/exercises">
          Exercises
        </Nav.Link>
        <Nav.Link as={Button} onClick={() => dispatch({ type: "LOGOUT_USER" })}>
          Logout
        </Nav.Link>
      </>
    );
  };
  const unauthenticatedLinks = () => {
    return (
      <>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
        <Nav.Link as={Link} to="/register">
          Register
        </Nav.Link>
      </>
    );
  };
  return (
    <NavBar style={{ width: "100%" }} bg="primary" variant="dark">
      <NavBar.Brand href="#home">Navbar</NavBar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to={"/"}>
          Home
        </Nav.Link>
        {isAuthenticated ? authenticatedLinks() : unauthenticatedLinks()}
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </NavBar>
  );
}

export default Navbar;
