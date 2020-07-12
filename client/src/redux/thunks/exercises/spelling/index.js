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
    dispatch({type: "__SPELLING_WORD_FETCHED", payload: res.data})
    return {loading: false}
}
