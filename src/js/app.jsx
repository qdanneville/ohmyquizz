import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";


import Home from "./pages/home";
import Players from "./pages/players";

export default props => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.app.isLoaded);

  useEffect(() => {
    dispatch({ type: "SET_LOADED" });
  }, []);


  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="app-wrapper">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/players" exact component={Players} />
      </Switch>
    </div>
  );
};
