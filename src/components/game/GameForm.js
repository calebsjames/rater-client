import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    
    const history = useHistory()
    const { gameId } = useParams()
    const { getGameById, editGame, createGame, getGameTypes, gameTypes } = useContext(GameContext)
    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        number_of_players: "",
        title: "",
        maker: "",
        gameTypeId: 0
    })


    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */

    
    useEffect(() => {        
        getGameTypes()
        .then(() => {
            if(gameId) {
                getGameById(gameId)
                .then(setCurrentGame)
            }
        })
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameTitleState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.title = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.number_of_players = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameSkillLevelState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.skill_level = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.gameTypeId = event.target.value
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */
    
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameTitleState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameMakerState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players"># of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGamePlayersState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameSkillLevelState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="gameTypeId" value={currentGame?.gameTypeId} className="gameTypeId" id="gameTypeId" onChange={changeGameTypeState}>
                        <option key="0" value="0">Choose a game type</option>
                        {
                            gameTypes?.map(g => {
                                console.log(g)
                                return <option key={g.id} value={g.id}>{g.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            
            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    
                    // Send POST request to your API
                    if(gameId) {
                        console.log("!", currentGame)
                        const game = {
                            id: parseInt(gameId),
                            maker: currentGame.maker,
                            title: currentGame.title,
                            number_of_players: parseInt(currentGame.number_of_players),
                            skill_level: parseInt(currentGame.skill_level),
                            gameTypeId: parseInt(currentGame?.gameTypeId)
                        }
                        editGame(game)
                        .then(() => history.push("/"))
                    
                    createGame(game)
                        .then(() => history.push("/games"))
                    } else {
                        const game = {
                            maker: currentGame.maker,
                            title: currentGame.title,
                            number_of_players: parseInt(currentGame.number_of_players),
                            skill_level: parseInt(currentGame.skill_level),
                            gameTypeId: parseInt(currentGame.gameTypeId)
                        }
                        createGame(game)
                        .then(() => history.push("/games"))
                    }
                    }}
                    className="btn btn-primary">{gameId?"Edit":"Create"}</button>
        </form>
    )
}
                