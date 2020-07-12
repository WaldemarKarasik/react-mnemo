import React, {useEffect, useState} from 'react'
import {Pane, Heading, TextInput} from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { showIntroInit, __spellingGetRandomWord } from '../../redux/thunks/exercises/spelling'
import {useSelector} from 'react-redux'
import IntroComponent from '../../components/exercises/spelling/IntroComponent'
export default function Spelling() {

    const dispatch = useDispatch()
    const shouldShowIntro = useSelector((state)=>state.spellingReducer.shouldShowIntro)
    const isNew = useSelector((state) =>state.userData.user ? state.userData.user.new : false)
    const isAuthenticated = useSelector((state)=>state.userData.isAuthenticated)
    const wordList = useSelector((state)=>state.learningList.words)
    const currentWord = useSelector((state) => state.spellingReducer.word)
    const [loading, setLoading] = useState(true)
    const [wordControl, setWordControl] = useState([])
    const [usersGuess, setUsersGuess] = useState("")
    useEffect(() => {
        if (isAuthenticated && wordList !==0) {
            dispatch({type: "SHOULD_SHOW_INTRO"})
        }
    },[])
    useEffect(() => {
        if(!isNew && isAuthenticated && wordList.length > 0) {
            dispatch(__spellingGetRandomWord())
            setLoading(false)
        }
    },[isNew, isAuthenticated, wordList])
    useEffect(() => {
        if (Object.keys(currentWord).length ===0) {
            return;
        }
        else {
             setWordControl(currentWord.name.split(""))
             
        }
    },[currentWord])
    const onUsersGuess = (e) => {
        // for (let key in wordControl) {
        //     if (e.target.value === wordControl[key]) {
        //         alert('hello')
        //     }
        // }
        for (let i=0; i < wordControl.length;) {
            if (wordControl[i] === e.target.value) {
                
                setUsersGuess(e.target.value)
               
                console.log('setting users guess')
                i++
            } else {
                console.log(wordControl[i], e.target.value)
                return ;
            }
        }
    }
    if (!isAuthenticated) {
        return <Pane>
            <Heading>You do not have any words in your learning list</Heading>
        </Pane>
    }
    if (wordList.length === 0)  {
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
            
            return (<Pane height='100%'>
            <TextInput value={usersGuess} onChange={(e) => onUsersGuess(e)} placeholder="Type here..." />
        </Pane>)

        }
    }
   
   
}
