import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAPlayer } from "../reducers/game"

export default props => {
    const dispatch = useDispatch();
    const player = useSelector(state => state.game.currentPlayer)
    const isLoading = useSelector(state => state.game.currentPlayerIsLoading)


    useEffect(() => {
        if (!player) {
            dispatch(fetchAPlayer(props.match.params.playerId));
        }
    }, [])

    if (!player) return (<div className="block w-full text-align-center"><i className="loader my-auto"></i></div>)
    if (isLoading && !player) return (<div className="block w-full text-align-center"><i className="loader my-auto"></i></div>)

    return (
        <div className="column-span-4 column-span-6-md column-span-12-xs text-align-center bg-white text-purple-dark box-shadow-3 br-4 px-8 py-4" key={player.sys.id}>
            <header className="flex items-center">
                <i className="h-8 w-8 br-50 bg-grey mr-4"></i>
                <p className="f2 sofia font-bold text-purple-dark">{player.fields.name['en-US']}</p>
            </header>
            <main className="text-align-left overflow-hidden max-height-100px">
                <span className="body-1">{player.fields.description['en-US']}</span>
            </main>
        </div>
        // <h1>lol</h1>
    )
}