import React from "react";
import {Pane, Heading, Paragraph} from 'evergreen-ui'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Box, Button} from 'grommet'

export default function Exercises() {
  const history = useHistory()
  const onRepeatExerciseClickHandler = (e) => {
    history.push('spelling')
  }
  return (
    <Box justify="center" height="100%" align="center">
    <Box gap="medium" margin={{top: '5rem'}}direction="row">
      <Button color="neutral-3" primary size="medium" label="Spelling" onClick={e=>onRepeatExerciseClickHandler(e)} />
      <Button color="neutral-3" primary size="medium" label="Spelling" onClick={e=>onRepeatExerciseClickHandler(e)} />

    </Box>
    </Box>
  )
}
