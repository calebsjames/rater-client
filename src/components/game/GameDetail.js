import React,{ useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GameContext } from "./GameProvider"

export const GameDetail = () => {
        
    const { getGameById } = useContext(GameContext)
    const { gameId } = useParams()

    
    const [currentGame, setCurrentGame] = useState({
        ages: "",
        description: "",
        est_time: "",
        maker: "",
        number_of_players: 0,
        title: "",
        year: 0
    })


    useEffect(()=>{
        getGameById(gameId)
        .then(setCurrentGame)
    }, [])    

    return (
        <article className="game">
            <h2>{currentGame.title}</h2>
            <div className="gameMaker">Maker: {currentGame.maker}</div>
            <div className="gameYear">Year: {currentGame.year}</div>
            <div className="gameNumberOfPlayers">Players: {currentGame.players}</div>
            <div className="gameDescription">Description: {currentGame.description}</div>
            <div className="gameAge">Ages: {currentGame.ages}</div>
            <div className="gameEstTime">Time: {currentGame.est_time}</div>
        </article>
    )
}
