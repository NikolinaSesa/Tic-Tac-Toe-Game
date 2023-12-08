import express from 'express'
import socket from 'socket.io'
import http from 'http'
import * as dotenv from 'dotenv'
//import cors from 'cors'
//import helmet from 'helmet'
import mongoose from 'mongoose'
import playerRouter from './routes/players'
import gameRouter from './routes/games'
import authRouter from './routes/auth'

dotenv.config()

const app = express()

//app.use(helmet())
//app.use(cors())
app.use(express.json())
app.use('/api/players/', playerRouter)
app.use('/api/games/', gameRouter)
app.use('/api/auth/', authRouter)

const port = process.env.PORT
const mongoDB = process.env.MONGODB || ""

mongoose.connect(mongoDB)
   .then(() => {
       console.log('Connected to MongoDB... ')})
   .catch(error => console.log('Could not connect to MongoDB...', error))

app.listen(port, () => {console.log(`Listening on port ${port}...`)})


