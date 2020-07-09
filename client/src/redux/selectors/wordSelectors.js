import {createSelector} from "reselect";


const getAllWords = (state) => state.words.words

const getName = (undefined, name) => name

export const selectWord = createSelector(
    getAllWords,
    getName,
    (words, name) => {
        return words.filter(word=>word.name === name)
    }
)


// export const selectWord  = createSelector(
//     state=>state.words.words,
//     words=> words.filter(
//         word => word.name === "Abash"
//     )
// )

