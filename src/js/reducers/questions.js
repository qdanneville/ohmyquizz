import { combineReducers } from "redux";
// import api from "../utils/api";

// export const pickQuestion = id => {
//     return dispatch => {
//         dispatch({
//             type: "FETCH_CURRENT_QUESTION"
//         });
//     };
// }

export const fetchCurrentQuestion = id => {
    return (dispatch, getState) => {
        dispatch({
            type: "FETCH_CURRENT_QUESTION"
        });

        const questions = getState().questions.items;
        const currentQuestion = questions.find(question => question.sys.id === id);

        //If we can't find any question, we must return something
        if (!currentQuestion) return
        dispatch(setCurrentQuestion(currentQuestion))
    }
}

const setCurrentQuestion = (question) => {
    return ({
        type: "SET_CURRENT_QUESTION",
        payload: question
    })
}



const question = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_QUESTION":
            return action.payload;
        case "RESET_CURRENT_QUESTION":
            return state;
        default:
            return state;
    }
}

const questionIsLoading = (state = false, action) => {
    switch (action.type) {
        case "FETCH_CURRENT_QUESTION":
            return true;
        case "SET_CURRENT_QUESTION":
            return false;
        default:
            return state;
    }
};

const questions = (state = [], action) => {
    switch (action.type) {
        case "SET_QUESTIONS":
            return action.payload;
        default:
            return state;
    }
}

const questionsAreLoaded = (state = false, action) => {
    switch (action.type) {
        case "SET_QUESTIONS":
            return true;
        default:
            return state;
    }
};

export default combineReducers({
    items: questions,
    areLoaded: questionsAreLoaded,
});