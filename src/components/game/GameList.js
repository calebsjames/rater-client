import React, { useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames, deleteGame } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create" onClick={() => {
                history.push({ pathname: "/games/new" })}}
            >New Game</button>
            {
                games.map(game => {
                    return <section key={`${game.id}`} className="game">
                        <div className="gameTitle">
                            <h2>
                            <Link to={`/games/${game.id}/details`}>{game.title}</Link>
                            </h2>
                        </div>

                        
                    </section>
                })
            }
        </article>
    )
}