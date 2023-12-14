import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import playerRouter from './routes/players'
import gameRouter from './routes/games'
import authRouter from './routes/auth'

dotenv.config()

const port = process.env.PORT
const mongoDB = process.env.MONGODB || ""

const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*"}})

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

export {io}

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/api/players/', playerRouter)
app.use('/api/games/', gameRouter)
app.use('/api/auth/', authRouter)

mongoose.connect(mongoDB)
   .then(() => {
       console.log('Connected to MongoDB... ')})
   .catch(error => console.log('Could not connect to MongoDB...', error))

server.listen(port, () => {console.log(`Listening on port ${port}...`)})











