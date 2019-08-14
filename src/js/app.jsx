import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import api from "./utils/api"


import Home from "./pages/home";
import Players from "./pages/players";
import Game from "./pages/game";
import Layout from "./pages/layout";

import { useTitle } from "./components/custom-hook"
import { useAppIsFullscreen } from "./components/custom-window-size"

export default props => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.app.isLoaded);
  const isFullscreen = useSelector(state => state.app.fullscreen)

  useTitle('My super title');
  useAppIsFullscreen();

  // if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="app-wrapper">
      {
        isFullscreen ? <h1>App width : small </h1> : <h1>App width : large</h1>
      }
      {/* <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/players" exact component={Players} />
        <Route path="/game" exact component={Game} />
        <Route path="/layout" exact component={Layout} />
      </Switch> */}
    </div>
  );
};
