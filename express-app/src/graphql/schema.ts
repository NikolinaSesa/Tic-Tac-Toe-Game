import {buildSchema} from "graphql"

export const schema = buildSchema(`

    type PlayerType {
        _id: ID
        name: String
        email: String
        password: String
    }

    type MoveType {
        spot: Int
        sign: String
        player: PlayerType
    }

    type GameType {
        _id: ID
        player1: PlayerType
        player2: PlayerType
        winner: String
        moves: [MoveType]
        multiplayer: Boolean
    }

    type Query {
        getCurrentPlayer(token: String): PlayerType
        getPlayers: [PlayerType]
        
        getGame(id: ID): GameType
        getFinishedGames: [GameType]
        getUnfinishedGames : [GameType]
    }

    type Mutation {
        registration(name: String, email: String, password: String): PlayerType
        login(email: String, password: String): String

        createNewGame(player1: ID, multiplayer: Boolean): GameType
        joinExistingGame(id: ID, player2: ID): GameType
        saveGameResult(id: ID, winner: String, moves: [MoveType]): GameType
    }
`)