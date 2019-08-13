/*
{
    isLoaded: false
}
*/

import { combineReducers } from "redux";

const isLoaded = (state = false, action) => {
    switch (action.type) {
        case "SET_LOADED":
            return true;
        default:
            return state;
    }
};

const title = (state = 'My default title', action) => {
    switch (action.type) {
        case "SET_TITLE":
            return action.payload;
        case "RESET_TITLE":
            return '';
        default:
            return state;
    }
};

export default combineReducers({
    isLoaded,
    title,
});
