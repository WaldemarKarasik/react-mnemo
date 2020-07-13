import Axios from "axios"

export const showIntroInit = () => async dispatch => {
    
} 

// This action is dispatched after user familiarizes himself with the intro and  ensures that the user will never see that intro again
export const introViewed = () => async dispatch => {
    const token = localStorage.getItem("auth-token")
    const res = await Axios.post('/users/intro-viewed', null, {
        headers: {
            "x-auth-token": token
        }
    })
    if (res.status === 200) {
        console.log(res.data)
        dispatch({type: "SET_USER", payload: res.data})
        return {msg: {msgBody: "Success", msgError: false}}
    }
    else
        return {msg: {msgBody: "Fail", msgError: true}}
}

export const __spellingGetRandomWord = () => async dispatch => {
    const token = localStorage.getItem("auth-token")
    const res = await Axios.post('/exercises/spelling/random-word', null, {
        headers: {
            "x-auth-token": token
        }
    })
    if (res.data.msg && res.data.msg.msgBody == "User has no words") {
        dispatch({type: "__SPELLING_WORDS_EMPTY"})
        return {msg: {msgBody: "User has no words"}}
    }
    dispatch({type: "__SPELLING_WORD_FETCHED", payload: res.data})
    return {loading: false}
}

export const __spellingDeleteWordFromList = (_id) => async dispatch => {
    const obj = {_id: _id}
    const data = JSON.stringify(obj)
    console.log(data)
    const token = localStorage.getItem("auth-token")
    const res = await fetch("/users/delete-word-from-list", {method: 'POST', headers: {'Content-Type': 'application/json', "x-auth-token": token }, body: data}).then(res=>res.json())
    console.log(res)
    if (res.user) {
        dispatch({type: "ADD_TO_LEARN_SUCCESS", payload: res.user.words})
    }
}