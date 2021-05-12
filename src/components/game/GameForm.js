import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    
    const history = useHistory()
    const { gameId } = useParams()
    const { getGameById, editGame, createGame, getGames, gameTypes } = useContext(GameContext)
    

    const [currentGame, setCurrentGame] = useState({
        ages: "",
        description: "",
        est_time: "",
        maker: "",
        number_of_players: 0,
        title: "",
        year: 0
    })


    
    useEffect(() => {        
        getGames()
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
        const handleControlledInputChange = (event) => {
            let game = {...currentGame}
        
            game[event.target.id] = event.target.value
        
            setCurrentGame(game)
          }
    
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" id="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year: </label>
                    <input type="text" name="year" id="year" required className="form-control"
                        value={currentGame.year}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players"># of Players: </label>
                    <input type="text" name="number_of_players" id="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ages">Ages: </label>
                    <input type="text" name="ages" id="ages" required className="form-control"
                        value={currentGame.ages}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="est_time">Time: </label>
                    <input type="text" name="est_time" id="est_time" required className="form-control"
                        value={currentGame.est_time}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required className="form-control"
                        value={currentGame.description}
                        onChange={ handleControlledInputChange }
                    />
                </div>
            </fieldset>
            
            
            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    
                    // Send POST request to your API
                    if(gameId) {
                        
                        const game = {
                            id: parseInt(gameId),
                            ages: currentGame.ages,
                            description: currentGame.description,
                            est_time: currentGame.est_time,
                            maker: currentGame.maker,
                            number_of_players: parseInt(currentGame.number_of_players),
                            title: currentGame.title,
                            year: currentGame.year
                        }

                        editGame(game)
                        .then(() => history.push(`/games/${gameId}/details`))
                                        
                    } else {

                        const game = {
                            ages: currentGame.ages,
                            description: currentGame.description,
                            est_time: currentGame.est_time,
                            maker: currentGame.maker,
                            number_of_players: parseInt(currentGame.number_of_players),
                            title: currentGame.title,
                            year: currentGame.year
                        }
                        createGame(game)
                        .then(() => history.push("/games"))
                    }
                    }}
                    className="btn btn-primary">{ gameId ? "Edit" : "Create" }</button>
        </form>
    )
}
                