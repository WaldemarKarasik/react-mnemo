import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
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
        <Row style={{ width: "100vh" }}>
          {this.props.words[0].docs.map((word) => {
            return (
              <Col xs={12}>
                <Link to={`/word/${word.name}`}>{word.name}</Link>
              </Col>
            );
          })}
        </Row>
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
