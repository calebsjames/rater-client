import React,{ useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CategoryContext } from "../category/CategoryProvider"
import { GameContext } from "./GameProvider"


export const GameDetail = () => {
        
    const { getGameById, deleteGame } = useContext(GameContext)
    const { getCategoryById, categories, getCategories } = useContext(CategoryContext)
    const { gameId } = useParams()
    const history = useHistory()
    
    const [currentGame, setCurrentGame] = useState({
        
        ages: "",
        description: "",
        est_time: "",
        maker: "",
        number_of_players: 0,
        title: "",
        year: 0,
        categories: []
    })

    useEffect(()=>{
        getGameById(gameId)
        .then(setCurrentGame)
    }, [])    
    
    console.log("cg", currentGame)
    return (
        <article className="game">
            <h2>{currentGame.title}</h2>
            <div className="gameMaker">Maker: {currentGame.maker}</div>
            <div className="gameYear">Year: {currentGame.year}</div>
            <div className="gameNumberOfPlayers">Players: {currentGame.players}</div>
            <div className="gameAge">Ages: {currentGame.ages}</div>
            <div className="gameEstTime">Time: {currentGame.est_time}</div>
            <div className="gameDescription">Description: {currentGame.description}</div>
            <div className="gameCategory">Categories: {currentGame.categories.map(cg => cg.name + " ")}</div>
            
            
            <button className="editButton" 
                onClick = {() => {
                history.push({ pathname: `/games/${gameId}/edit`})
                }}>edit</button>

            <button className="deleteButton"
                onClick={() => {
                deleteGame(gameId)
                history.goBack()
                }}>delete</button>

        </article>
    )
}
