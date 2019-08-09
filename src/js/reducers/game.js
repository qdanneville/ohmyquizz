import { combineReducers } from "redux";

const playersReducers = (state = [], actions) => {
    switch (action.type) {
        case "SET_PLAYERS":
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    isLoaded,
});