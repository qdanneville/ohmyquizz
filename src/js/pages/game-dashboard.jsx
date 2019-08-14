import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAGame } from "../reducers/game"

export default props => {
    const dispatch = useDispatch();
    const game = useSelector(state => state.game.currentGame);

    useEffect(() => {
        if (!game) dispatch(fetchAGame(props.match.params.gameId))
    })

    //Game logic is missing
    //Retrieve questions & current questions
    //Retrieve answers...
    return (
        <h1>JOUER !</h1>
    )
}