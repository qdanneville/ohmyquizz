import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../utils/api";

export default props => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players);

  useEffect(() => {
    api.then(api => {
      api.getEntries({ content_type: "player" }).then(entries => {
        dispatch({ type: "SET_PLAYERS", payload: entries.items });
      });
    });
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
