import express from 'express'
import { Server } from 'socket.io' 
import http from 'http'
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import playerRouter from './routes/players'
import gameRouter from './routes/games'
import authRouter from './routes/auth'
import {schema} from './graphql/schema'
import {root} from './graphql/resolvers'
import { graphqlHTTP } from 'express-graphql'

dotenv.config()

const port = process.env.NODE_PORT
const mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const react_app = process.env.REACT_APP

const app = express()

//app.use("/", cors(), helmet(), graphqlHTTP({
//    schema: schema,
//    rootValue: root,
//}))

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/api/players/', playerRouter)
app.use('/api/games/', gameRouter)
app.use('/api/auth/', authRouter)

const server = http.createServer(app)

const io = new Server(server, {cors: {
    origin: react_app
}})

io.on('connection', (socket) => {

    console.log("Connected...", socket.id)

    socket.on("sendMove", (data) => {
        socket.broadcast.emit("receiveMove", data)
    })

    socket.on("reset", () => {
        socket.broadcast.emit("reset")
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

export {io}

mongoose.connect(mongoDB)
        .then(() => console.log('Connected to MongoDB... '))
        .catch(error => console.log('Could not connect to MongoDB...', error))
       
server.listen(port, () => {console.log(`Listening on port ${port}...`)})