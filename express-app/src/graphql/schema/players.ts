import {buildSchema} from "graphql"

export const schema = buildSchema(`

    type PlayerType {
        _id: ID
        name: String
        email: String
        password: String
    }

    type Query {
        getCurrentPlayer(token: String): PlayerType
        getPlayers: [PlayerType]
    }

    type Mutation {
        registration(name: String, email: String, password: String): PlayerType
        login(email: String, password: String): String
    }
`)