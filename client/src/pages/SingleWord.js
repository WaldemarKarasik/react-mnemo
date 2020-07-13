import React, {useRef} from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectWord } from "../redux/selectors/wordSelectors";
import { Row, Col, Button, Badge } from "react-bootstrap";
import Axios from "axios";
import {Pane} from 'evergreen-ui'
import {Box, Card, Text, Heading, Drop} from 'grommet'

function SingleWord({ isAuthenticated, addToLearnList, userWordList }) {
  const history = useHistory();
  const { name } = useParams();
  const [word, setWord] = React.useState();
  React.useEffect(() => {
    async function getWord(name) {
      const res = await Axios.post(`/words/details/?name=${name}`);
      const data = res.data;
      setWord(data);
    }
    getWord(name);
  }, []);
  const onLearnClickHandler = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Login first");
      return history.push("/login");
    }
    addToLearnList(name);
  };
  const authButtons = () => {
    let words;
    if (userWordList.length > 0) {
      words = userWordList[0];
    } else if (userWordList.length === 0) {
      words = null;
    }

    if (words !== null) {
      console.log(words);
      if (!words.some((elem) => elem._id === word._id)) {
        return (
          <button
            onClick={(e) => onLearnClickHandler(e)}
            className="btn btn-success btn-sm"
          >
            Learn
          </button>
        );
      } else {
        return (
          <Badge variant="warning">You are already learning this word</Badge>
        );
      }
    } else {
      return (
        <button
          onClick={(e) => onLearnClickHandler(e)}
          className="btn btn-success btn-sm"
        >
          Learn
        </button>
      );
    }
    // if (words !== null && !words.some((elem) => elem._id === word._id)) {
    //   console.log("here");
    // return (
    //   <button
    //     onClick={(e) => onLearnClickHandler(e)}
    //     className="btn btn-success"
    //   >
    //     Learn
    //   </button>
    // );
    // } else {
    //   if (userWordList !== null) {
    //     return (
    //       <Badge variant="primary">You are already learning this word</Badge>
    //     );
    //   } else {
    //     return (
    //       <button
    //         onClick={(e) => onLearnClickHandler(e)}
    //         className="btn btn-success"
    //       >
    //         Learn
    //       </button>
    //     );
    //   }
    // }
  };
  const unauthButtons = () => {
    return (
      <button
        onClick={(e) => onLearnClickHandler(e)}
        className="btn btn-success btn-sm"
      >
        Learn
      </button>
    );
  };
  if (word) {
    return (
      <Box
        
       >
        <Box align="center">
        <Box align="center" direction="row">
          <Heading>{word.name}</Heading>
          {'-'}
          <Badge variant="info">{word.type}</Badge>
        </Box>
        
        
        <div>
          {word.examples.map((example, index) => {
            return <p key={index}>{example}</p>;
          })}
        </div>
        {isAuthenticated ? authButtons() : unauthButtons()}
        </Box>
      </Box>
    );
  } else {
    return <div>Loading</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userData.isAuthenticated,
    userWordList: state.learningList ? state.learningList.words : null,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addToLearnList: (name) =>
    dispatch({ type: "ADD_TO_LEARN_REQUEST", payload: name }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleWord);
