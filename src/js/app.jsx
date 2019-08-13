import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import api from "./utils/api"

import Home from "./pages/home";
import Players from "./pages/players";
import Game from "./pages/game";

export default props => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.app.isLoaded);

  useEffect(() => {
    dispatch({ type: "SET_LOADED" });
    dispatch({ type: "SET_TITLE", payload: 'My super title' });
    dispatch({ type: "RESET_TITLE" });
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="app-wrapper">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/players" exact component={Players} />
        <Route path="/game" exact component={Game} />
      </Switch>
    </div>
  );
};
