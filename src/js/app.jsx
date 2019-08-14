import React, { useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Players from "./pages/players";
import Profile from "./pages/profile";

export default props => {
  const isLoaded = useSelector(state => state.app.isLoaded);

  return (
    <div className="app-wrapper bg-grey-light">
      <header className="big text-align-center">
        <NavLink to="/players"><h1>Welcome to Oh my quizz !</h1></NavLink>
      </header>
      <Switch>
        <Route path="/players" component={Players} />
        <Route
          path="/profile/:playerId/"
          render={props => <Profile {...props} />}
        />
      </Switch>
    </div>
  );
};