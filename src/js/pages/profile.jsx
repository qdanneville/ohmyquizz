import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAPlayer, fetchCurrentPlayerGames, pickAGame } from "../reducers/game"
import { Switch, Route } from "react-router-dom"

import GameDashboard from "../pages/game-dashboard"

export default props => {
    const dispatch = useDispatch();
    const player = useSelector(state => state.game.currentPlayer)
    const isLoading = useSelector(state => state.game.currentPlayerIsLoading)
    const games = useSelector(state => state.game.currentPlayerGames)

    useEffect(() => {
        if (!player) {
            dispatch(fetchAPlayer(props.match.params.playerId));
        }

        dispatch(fetchCurrentPlayerGames(props.match.params.playerId))
    }, [])

    if (!games) return (<div className="block w-full text-align-center"><i className="loader my-auto"></i></div>)
    if (!player) return (<div className="block w-full text-align-center"><i className="loader my-auto"></i></div>)
    if (isLoading && !player) return (<div className="block w-full text-align-center"><i className="loader my-auto"></i></div>)

    return (
        <section className="grid-container">
            <div className="column-span-4 column-span-6-md column-span-12-xs text-align-center bg-white text-purple-dark box-shadow-3 br-4 px-8 py-4" key={player.sys.id}>
                <header className="flex items-center">
                    <i className="h-8 w-8 br-50 bg-grey mr-4"></i>
                    <p className="f2 sofia font-bold text-purple-dark">{player.fields.name['en-US']}</p>
                </header>
                <main className="text-align-left overflow-hidden max-height-100px">
                    <span className="body-1">{player.fields.description['en-US']}</span>
                </main>
            </div>
            <ul className="column-span-8 column-span-6-md flex">
                {
                    games.map(game =>
                        <li
                            onClick={() => dispatch(pickAGame(game, player.sys.id))}
                            key={game.sys.id}
                            className="bg-blue p-2 text-purple-dark br-5 mr-2 flex justify-center align-center font-bold hover:bg-blue-light transition-1 cursor-pointer">
                            {game.fields.name['en-US']}
                        </li>)
                }
            </ul>
            <section className="column-span-12 mt-10 text-align-center">
                <Switch>
                    <Route
                        path="/profile/:playerId/game/:gameId/"
                        render={props => <GameDashboard {...props} />}
                    />
                </Switch>
            </section>
        </section>
    )
}