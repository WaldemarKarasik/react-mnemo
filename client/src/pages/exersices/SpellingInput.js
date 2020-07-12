import React, {useState, useEffect, useRef} from 'react'
import {TextInput, Pane} from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { __spellingGetRandomWord } from '../../redux/thunks/exercises/spelling'


export default function SpellingInput({currentWord}) {
    const [wordControl, setWordControl] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [shouldHint, setShouldHint] = useState(false)
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
    const onKeyDownHandler = async (e) => {
        if(e.key=="Backspace") {
            setInputValue('')
        }
  
        if(e.key=="Enter") {
            if (e.target.value == wordControl.join('')) {
                const {loading} = await dispatch(__spellingGetRandomWord())
                if(!loading) {
                    setInputValue('')
                }
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
        <Pane>
        {shouldHint && (<p>{wordControl}</p>)}
        <TextInput value={inputValue} onKeyDown={onKeyDownHandler} onChange={(e) => onInputChange(e)} placeholder="Type here..." />
        </Pane>
    )
}
