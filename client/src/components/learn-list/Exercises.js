import React from "react";
import {Pane, Heading, Button, Paragraph} from 'evergreen-ui'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Exercises() {
  const history = useHistory()
  const onRepeatExerciseClickHandler = (e) => {
    history.push('spelling')
  }
  return ( <Pane display="flex" height={'100vh'} justifyContent="center">
    <Pane marginTop={140}>
      <Button onClick={e=>onRepeatExerciseClickHandler(e)} appearance="primary" intent="success"><Paragraph>Spelling</Paragraph></Button>
      <Button marginLeft={3} appearance="primary" intent="success"><Paragraph>Repeat</Paragraph></Button>
    </Pane>
  </Pane>)
}
