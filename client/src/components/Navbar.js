import React from "react";
import {
  Navbar as NavBar,
  Form,
  FormControl,
  
  Button
} from "react-bootstrap";
import {Nav, Anchor, Header, Box, Avatar} from 'grommet'
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Icons} from 'grommet'
function Navbar({ user, logout, isAuthenticated }) {
  console.log(isAuthenticated)
  const dispatch = useDispatch();
  const authenticatedLinks = () => {
    return (
      <>
      <Anchor as={Link} to="/exercises" label="Exercises" margin={{right: '10px'}}/>
        <Anchor onClick={() => dispatch({ type: "LOGOUT_USER" })} label="Logout" />
        
      </>
    );
  };
  const unauthenticatedLinks = () => {
    return (
      <>
           <Anchor as={Link} to="/login" label="Login" margin={{right: '10px'}}/>
           <Anchor as={Link} to="/register" label="Register" />
      </>
    );
  };
  return (
    // <NavBar style={{ width: "100%" }} bg="primary" variant="dark">
    //   <NavBar.Brand href="#home">Navbar</NavBar.Brand>
    //   <Nav className="mr-auto">
    //     <Nav.Link as={Link} to={"/"}>
    //       Home
    //     </Nav.Link>
    //     {isAuthenticated ? authenticatedLinks() : unauthenticatedLinks()}
    //   </Nav>
    //   <Form inline>
    //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //     <Button variant="outline-light">Search</Button>
    //   </Form>
    // </NavBar>
    <Header background="dark-1" pad="medium">
      <Box direction="row" align="center" gap="small">
        <Avatar />
        <Anchor color="white" as={Link} to="/">
          Mnemo
        </Anchor>
      </Box>
      <Nav direction="row">
        {!isAuthenticated ? unauthenticatedLinks() : authenticatedLinks()}
      </Nav>
    </Header>
  );
}

export default Navbar;
