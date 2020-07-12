const intitialState = {
    showIntro: null,
    shouldShowIntro: false,
    word: {}
}

export const SpellingExerciseReducer = (state=intitialState, action) => {
    switch (action.type) {
        case "SHOW_INTRO_INIT": {
            return {
                ...state,
                showIntro: true
            }
        }
        case "SHOULD_SHOW_INTRO": {
            return {
                ...state,
                shouldShowIntro: true
            }
        }
        case "__SPELLING_WORD_FETCHED": {
            return {
                ...state,
                word: action.payload
            }
        }
        default: 
            return state
    }
}