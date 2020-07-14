import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import {Box, List, Text, Anchor} from 'grommet'
import { Link } from "react-router-dom";
import HomePageAdminOptions from "../components/auth/HomePageAdminOptions";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading words...</div>;
    } else {
      return (
        <Box direction="row">
          <Box width="100%" basis="100%">
          <List direction="column" data={this.props.words[0].docs}
           primaryKey={(word) => <Box basis="5rem" pad={{vertical: '5px'}}><Anchor as={Link} to={`/word/${word.name}`}>{word.name}</Anchor>{this.props.user !== null && this.props.user.admin && (<HomePageAdminOptions name={word.name}/>)}</Box>}
          />
          </Box>
        </Box>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    words: state.words.words,
    isLoading: state.words.isLoading,
    user: state.userData.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWords: () => dispatch({ type: "GET_WORDS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
