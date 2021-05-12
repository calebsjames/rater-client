import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./game/GameDetail.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"





export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>           
                    <Route exact path="/">
                        <GameList />
                    </Route>
                    <Route exact path="/games">
                        <GameList />
                    </Route>
                    <Route exact path="/games/:gameId(\d+)/details">
                        <GameDetail />
                    </Route>
            </GameProvider>
            
        </main>
    </>
}