import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import api from "./utils/api"

import Home from "./pages/home";
import Players from "./pages/players";

export default props => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.app.isLoaded);

  useEffect(() => {
    dispatch({ type: "SET_LOADED" });

    // api.then(api => {
    //   api
    //     .getEntry("30DlkSFvmLSuAMN0rn9hwT")
    //     .then(entry => {
    //       console.log(entry);
    //       entry.fields.name["en-US"] = "Super spongeBob";
    //       return entry.update();
    //     })
    //     .then(entry => {
    //       console.log(entry);
    //     });
    // });
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
