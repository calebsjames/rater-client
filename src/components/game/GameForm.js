import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { GameContext } from "./GameProvider.js"
import { CategoryContext } from "../category/CategoryProvider.js"
import { Multiselect } from 'multiselect-react-dropdown'

export const GameForm = () => {
    
    const history = useHistory()
    const { gameId } = useParams()
    const { getGameById, editGame, createGame } = useContext(GameContext)
    const { getCategories, categories } = useContext(CategoryContext)
    

    const [currentGame, setCurrentGame] = useState({
        ages: "",
        description: "",
        est_time: "",
        maker: "",
        number_of_players: 0,
        title: "",
        year: 0,
        category: []
    })


    
    useEffect(() => {        
        getCategories()
        .then(() => {
            if(gameId) {
                getGameById(gameId)
                .then(setCurrentGame)
            }
        })
    }, [])

 
    const handleControlledInputChange = (event) => {
        let game = {...currentGame}
        game[event.target.id] = event.target.value
        setCurrentGame(game)
    }

    const handleControlledSelect = (e) => {
        let game = {...currentGame}
        game.categories = e
        console.log(e)
        console.log(game)
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type_id">GameType: </label>
                    <Multiselect 
                        id="category" options={categories} selectedValues={currentGame.categories} displayValue="name" 
                        onSelect={ handleControlledSelect } onRemove={ handleControlledSelect }>
                    </Multiselect>
                    {console.log()}
                </div>
            </fieldset>           

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    console.log(currentGame)
                    if(gameId) {
                        
                        const game = {
                            id: parseInt(gameId),
                            ages: currentGame.ages,
                            description: currentGame.description,
                            est_time: currentGame.est_time,
                            maker: currentGame.maker,
                            number_of_players: parseInt(currentGame.number_of_players),
                            title: currentGame.title,
                            year: currentGame.year,

                            categories: currentGame.categories.map(cg => cg.id)
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
                            year: currentGame.year,
                            categories: currentGame.categories.map(cg => cg.id)

                        }
                        createGame(game)
                        .then(() => history.push("/games"))
                    }
                    }}
                    className="btn btn-primary">{ gameId ? "Edit" : "Create" }
            </button>

        </form>
    )
}
                