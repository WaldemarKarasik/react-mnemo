import Axios from 'axios'
export const deleteWord = (name) => async dispatch => {
    const token = localStorage.getItem("auth-token")
    const res = await fetch(`/words/?name=${name}`, {
        method: 'DELETE',
        headers: {
            "x-auth-token": token
        }
    }).then(res=>res.json())
    console.log(res)
    dispatch({type: "WORDS_LOADING_SUCCESS", payload: res})
}