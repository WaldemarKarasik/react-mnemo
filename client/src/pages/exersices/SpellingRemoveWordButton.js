import React from 'react'
import {FormClose} from 'grommet-icons'
import {Button, Box} from 'grommet'
import { __spellingDeleteWordFromList } from '../../redux/thunks/exercises/spelling'
import {useDispatch} from 'react-redux'

export default function SpellingRemoveWordButton({_id}) {
    const dispatch = useDispatch()
    const onRemoveFromLearningListHandler = async (e) => {
        if(window.confirm("Are you sure you don't want to learn this word anymore?")) {
            await dispatch(__spellingDeleteWordFromList(_id))
        } 
    }
    return (
        <>
        <Box focusIndicator={false} onClick={(e)=>onRemoveFromLearningListHandler(e)} hoverIndicator={{color: 'status-critical'}}>
        <FormClose size="large" color="dark-4"/>
        </Box>
        </>
    )
}
