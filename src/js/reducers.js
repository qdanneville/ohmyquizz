import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import playersReducer from "./reducers/players";
import questionsReducer from "./reducers/questions";
import gameReducer from "./reducers/game";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        players: playersReducer,
        questions: questionsReducer,
        game: gameReducer
    });

export default createRootReducer;
