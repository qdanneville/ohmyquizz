import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./utils/api";

import Home from "./pages/home";

export default props => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.app.isLoaded);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    dispatch({ type: "SET_LOADED" });

    api
      .getEntries({
        content_type: "player"
      })
      .then(function(entries) {
        entries.items.forEach(function(entry) {
          setPlayerName(entry.fields.name);
        });
      });
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="app-wrapper">
      <h1>App wrapper</h1>
      <Home />
      { playerName ? `Player name is : ${playerName}` : `Player name is :`}
    </div>
  );
};
