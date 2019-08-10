import { combineReducers } from "redux";

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