import React, {useEffect, useState} from 'react'
import {Pane, Heading, TextInput} from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { showIntroInit, __spellingGetRandomWord } from '../../redux/thunks/exercises/spelling'
import {useSelector} from 'react-redux'
import IntroComponent from '../../components/exercises/spelling/IntroComponent'
import SpellingInput from './SpellingInput'
import {Box, Text} from 'grommet'
import {Redirect, useHistory} from 'react-router-dom'
import SpellingRemoveWordButton from './SpellingRemoveWordButton'
export default function Spelling() {

    const dispatch = useDispatch()
    const shouldShowIntro = useSelector((state)=>state.spellingReducer.shouldShowIntro)
    const isNew = useSelector((state) =>state.userData.user ? state.userData.user.new : false)
    const isAuthenticated = useSelector((state)=>state.userData.isAuthenticated)
    const wordList = useSelector((state)=>state.learningList.words)
    const currentWord = useSelector((state) => state.spellingReducer.word)
    const history = useHistory()
    // const definition = useSelector((state) => state.spellingReducer.word.definition ? state.spellingReducer.word.definition : null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (isAuthenticated && wordList !==0) {
            dispatch({type: "SHOULD_SHOW_INTRO"})
        }
    },[])
    useEffect(() => {
        async function getRandomWord() {
            const randomWord = await dispatch(__spellingGetRandomWord())
            setLoading(false)
        }
        if(!isNew && isAuthenticated && wordList.length > 0) {
            getRandomWord()
            
        }
    },[isNew, isAuthenticated, wordList])
    
    if (!isAuthenticated) {
        return <Pane>
            <Heading>You do not have any words in your learning list</Heading>
        </Pane>
    }
    if (wordList.length === 0 || currentWord == null)  {
        return (
            <Pane>
                <Heading>You do not have any words in your learning list</Heading>
            </Pane>
        )
    } else {
        if(isNew) {
            return <IntroComponent/>
        } 
        if (Object.keys(currentWord).length === 0)
            return (<div>Loading...</div>)
           
        else{
            console.log(currentWord)
            return (<Box display="flex" height='100%'>
            <SpellingInput currentWord={currentWord} />
            <Box direction="row">
                <Box width="12rem">
                    <Text >{currentWord.defintion ? currentWord.defintion : 'this word does not have definition yet'}</Text>
                </Box>
                <Box>
                    <SpellingRemoveWordButton _id={currentWord._id}/>
                </Box>
            </Box>
        </Box>)

        }
    }
   
   
}
