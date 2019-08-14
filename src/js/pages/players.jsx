import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getEntries } from "../utils/contentful"
import { pickAPlayer } from "../reducers/game"

export default props => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players);

  useEffect(() => {
    getEntries('player').then(entries => {
      dispatch({ type: 'SET_PLAYERS', payload: entries.items })
    })
  }, [])

  if (!players.areLoaded) return (<div className="block w-full text-align-center"><i className="loader my-auto"></i></div>)

  return (
    <section className="grid-container">
      <div className="column-span-12 text-align-center">
        <h1 className="text-purple-dark sofia uppercase f1">Choose a player :</h1>
      </div>
      {
        players.items.map(player =>
          <div className="column-span-4 column-span-6-md column-span-12-xs text-align-center bg-white text-purple-dark box-shadow-3 br-4 px-8 py-4" key={player.sys.id}>
            <header className="flex items-center">
              <i className="h-8 w-8 br-50 bg-grey mr-4"></i>
              <p className="f2 sofia font-bold text-purple-dark">{player.fields.name['en-US']}</p>
            </header>
            <main className="text-align-left overflow-hidden max-height-100px">
              <span className="body-1">{player.fields.description['en-US']}</span>
            </main>
            <footer className="mt-4">
              <button
                onClick={() => dispatch(pickAPlayer(player))}
                className="btn block w-full">
                Choose me !
              </button>
            </footer>
          </div>
        )
      }
    </section>
  );
};
