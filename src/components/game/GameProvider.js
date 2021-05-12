import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])


    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
         })
            .then(getGames)
    }
    

    const getGameById = (id) => {
        return fetch(`http://localhost:8000/games/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const editGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`,{
            method:"PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(game)
        })
        .then(getGames)
    }

    
    const deleteGame = gameId => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            },
        })
        .then(getGames)
    }

    return (
        
        <GameContext.Provider value={{ games, getGameById, editGame, getGames, deleteGame, createGame }} >
            { props.children }
        </GameContext.Provider>
    )
}
