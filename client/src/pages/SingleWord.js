import React, {useRef} from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectWord } from "../redux/selectors/wordSelectors";
import { Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import Axios from "axios";
import {Pane} from 'evergreen-ui'
import {Box, Card, Text, Heading, Drop, Paragraph} from 'grommet'
import { addToLearn } from "../redux/api/userApi";

function SingleWord({ isAuthenticated, addToLearnList, userWordList }) {
  const history = useHistory();
  const { name } = useParams();
  const [word, setWord] = React.useState();
  const [isAddingWord, setIsAddingWord] = React.useState(false)
  console.log(isAddingWord)
  React.useEffect(() => {
    async function getWord(name) {
      const res = await Axios.post(`/words/details/?name=${name}`);
      const data = res.data;
      setWord(data);
    }
    getWord(name);
    
  }, []);
  const onLearnClickHandler = async (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Login first");
      return history.push("/login");
    }
    const res = await addToLearnList(name)
    setIsAddingWord(true)

   
  };
  const authButtons = () => {
    let words;
    if (userWordList.length > 0) {
      words = userWordList[0];
    } else if (userWordList.length === 0) {
      words = null;
    }

    if (words !== null) {
      if (!words.some((elem) => elem._id === word._id)) {
        if (isAddingWord) {
          return (<Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
      </Spinner>)
        }
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
      if (isAddingWord) {
        return (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>)
      }
      return (
        <button
          onClick={(e) => onLearnClickHandler(e)}
          className="btn btn-success btn-sm"
        >
          Learn
        </button>
      );
    }

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

        <Paragraph  textAlign="center">{word.definition}</Paragraph>
        
        
        <div>
          {word.examples.map((example, index) => {
            return <Paragraph size="large" key={index}>{example}</Paragraph>;
          })}
        </div>
        {isAuthenticated ? authButtons() : unauthButtons()}
        {}
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
