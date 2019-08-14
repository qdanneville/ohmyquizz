/*
{
    currentQuestion : question
}
*/

import { combineReducers } from "redux";
import { replace } from "connected-react-router"
import { getEntry } from "../utils/contentful"

export const pickAPlayer = (player) => {
    return dispatch => {
        dispatch({ type: 'FETCH_CURRENT_PLAYER' })

        dispatch(replace(`/profile/${player.sys.id}/`));
        dispatch({ type: 'SET_CURRENT_PLAYER', payload: player });
    }
}

export const fetchAPlayer = (playerID) => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_CURRENT_PLAYER' })
        //Asynchrone
        getEntry(playerID).then(player => {
            dispatch({ type: 'SET_CURRENT_PLAYER', payload: player })
        });
    }
}

export const currentPlayer = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_PLAYER":
            return action.payload;
        case "RESET_CURRENT_PLAYER":
            return null;
        default:
            return state;
    }
}

export const currentPlayerIsLoading = (state = false, action) => {
    switch (action.type) {
        case "FETCH_CURRENT_PLAYER":
            return true;
        case "SET_CURRENT_PLAYER":
            return false;
        case "RESET_CURRENT_PLAYER":
            return false;
        default:
            return state;
    }
}

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

export default combineReducers({
    currentQuestion: question,
    questionIsLoading: questionIsLoading,
    currentPlayer,
    currentPlayerIsLoading
});