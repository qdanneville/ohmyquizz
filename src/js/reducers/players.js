import { combineReducers } from "redux";

const players = (state = [], action) => {
    switch (action.type) {
        case "SET_PLAYERS":
            return action.payload;
        default:
            return state;
    }
}

const PlayersAreLoaded = (state = false, action) => {
    switch (action.type) {
        case "SET_PLAYERS":
            return true;
        default:
            return state;
    }
};

export default combineReducers({
    items: players,
    areLoaded: PlayersAreLoaded,
});