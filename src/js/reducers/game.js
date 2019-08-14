/*
{
    currentQuestion : question
}
*/

import { combineReducers } from "redux";
import { replace, push } from "connected-react-router"
import { getEntry, getEntries } from "../utils/contentful"

export const pickAGame = (game, playerId) => {
    return dispatch => {
        dispatch({ type: 'FETCH_CURRENT_GAME' })
        dispatch(push(`/profile/${playerId}/game/${game.sys.id}/`));
        dispatch({ type: 'SET_CURRENT_GAME', payload: game });
    }
}

export const fetchAGame = (gameId) => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_CURRENT_GAME' })

        //Asynchrone
        getEntry(gameId).then(game => {
            dispatch({ type: 'SET_CURRENT_GAME', payload: game })
        });
    }
}

export const currentGame = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_GAME":
            return action.payload;
        case "RESET_CURRENT_GAME":
            return null;
        default:
            return state;
    }
}

export const fetchCurrentPlayerGames = (playerId) => {
    return dispatch => {
        dispatch({ type: 'FETCH_CURRENT_GAMES' });

        getEntries('game').then(games => {
            let actualGames = games.items.filter(game => {
                if (game.fields.player) {
                    return game.fields.player['en-US'].sys.id === playerId
                }
            })
            dispatch({ type: 'SET_CURRENT_GAMES', payload: actualGames })
        })
    }
}

export const currentPlayerGames = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_GAMES":
            return action.payload;
        case "RESET_CURRENT_GAMES":
            return null;
        default:
            return state;
    }
}

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
    currentPlayerIsLoading,
    currentPlayerGames,
    currentGame
});