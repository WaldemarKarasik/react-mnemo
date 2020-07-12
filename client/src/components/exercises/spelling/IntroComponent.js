import React, { useState } from 'react'
import {Pane, Dialog, Heading} from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { introViewed } from '../../../redux/thunks/exercises/spelling'

export default function IntroComponent() {
    const [state, setState] = useState({isShown: true, isLoading: false})
    const dispatch = useDispatch()
    const onConfirmHandler = async  () => {
        const gotIt = new Promise( async (resolve, rejeect) => {
            const res = await dispatch(introViewed())
            setState({...state, isLoading: true})
            setTimeout(() =>{
                
                resolve()
            },2000)
            
        })
        await gotIt.then(setState({isShown: false}))
        
        
    }
    return (
        <Pane>
            <Dialog
        isShown={state.isShown}
        title="Exercise Description"
        onCloseComplete={() => setState({ isShown: false, isLoading: false })}
        isConfirmLoading={state.isLoading}
        onConfirm={() => onConfirmHandler()}
        confirmLabel={state.isLoading ? 'Loading...' : 'Got it'}
      >
        <Heading size={6}>In this exercise you will a see definition of a random word in your list. You have to recall the word by this defintion</Heading>
      </Dialog>
        </Pane>
    )
}
