import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import {Box, List, Text, Anchor} from 'grommet'
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading words...</div>;
    } else {
      return (
        <Box style={{ width: "100vh" }}>
          <List data={this.props.words[0].docs}
           primaryKey={(word) => <Anchor as={Link} to={`/word/${word.name}`}>{word.name}</Anchor>}
          />
          {/* {this.props.words[0].docs.map((word) => {
            return (
              <Box>
                <Link to={`/word/${word.name}`}>{word.name}</Link>
              </Box>
            );
          })} */}
        </Box>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    words: state.words.words,
    isLoading: state.words.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWords: () => dispatch({ type: "GET_WORDS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
