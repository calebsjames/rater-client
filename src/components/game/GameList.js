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
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">
                            <h2>
                            <Link to={`/games/${game.id}/details`}>{game.title}</Link>
                            </h2>
                        </div>
                        {/* <div className="game__type">type : {game?.game_type.name}</div> */}
                        <button className="editButton" onClick = {() => {
                            history.push({ pathname: `/games/edit/${game.id}`})
                        }}>edit</button>
                        <button className="delete_button" onClick={()=>{
                            deleteGame(game.id)
                        }}>delete</button>
                    </section>
                })
            }
        </article>
    )
}