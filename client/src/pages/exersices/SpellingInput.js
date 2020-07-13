import React, {useState, useEffect, useRef} from 'react'
// import {TextInput} from 'evergreen-ui'
import {TextInput, Text, Drop, Keyboard} from 'grommet'

import {Box} from 'grommet'
import { useDispatch } from 'react-redux'
import { __spellingGetRandomWord } from '../../redux/thunks/exercises/spelling'


export default function SpellingInput({currentWord}) {
    const [wordControl, setWordControl] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [shouldHint, setShouldHint] = useState(false)
    const ref = React.useRef()
    const dispatch = useDispatch()
    // const [tried, setTried] = useState(false)
    const onInputChange = (e) => {
        
        if (wordControl[e.target.value.length - 1] === e.target.value.slice(-1)) {
            setShouldHint(false)
            setInputValue(e.target.value);
          } else {
            setShouldHint(true)
          }
    }
    const onEnter = async (e) => {
        // if(e.key=="Backspace") {
        //     setInputValue('')
        // }
  
            if (e.target.value == wordControl.join('')) {
                const {loading} = await dispatch(__spellingGetRandomWord())
                if(!loading) {
                    setInputValue('')
                }
            }
        

    }

    useEffect(() => {
        if (Object.keys(currentWord).length ===0) {
            return;
        }
        else {
             setWordControl(currentWord.name.split(""))
             
        }
    },[currentWord])
    return (
        <Box>
        <Drop align={{ top: "bottom" }} target={ref.current}  style={{visibility: shouldHint ? 'visible' : 'hidden'}}>
        <Text margin={{vertical: '5px'}} color="dark-4" size="large">{wordControl}</Text>
        </Drop>
        <Keyboard onBackspace={() => {setInputValue('')}} onEnter={onEnter}>
        <TextInput ref={ref} value={inputValue} onChange={(e) => onInputChange(e)} placeholder="Type here..." />
        </Keyboard>
        </Box>
    )
}
