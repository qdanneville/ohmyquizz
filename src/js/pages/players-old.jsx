import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntries } from "../utils/contentful"

import api from "../utils/api";

export default props => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players);

  useEffect(() => {
    getEntries('player').then(players => dispatch({ type: "SET_PLAYERS", payload: players.items }));
  }, []);

  if (!players.areLoaded) return <h1>Players : ...</h1>;

  return (
    <section>
      <h1>Players :</h1>
      <ul>
        {players.items.map(player => (
          <li key={player.sys.id} className="block">
            {player.fields.name["en-US"]}
          </li>
        ))}
      </ul>
    </section>
  );
};
