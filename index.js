import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import players from './routes/players.js';
import games from './routes/games.js';
import auth from './routes/auth.js';

dotenv.config()

const app = express()

app.use(helmet())
app.use(express.json()) 
app.use('/api/players/', players)
app.use('/api/games/', games)
app.use('/api/auth/', auth)

const port = process.env.PORT
const mongoDB = process.env.MONGODB 

mongoose.connect(mongoDB)
    .then(() => {
        console.log('Connected to MongoDB...')
        app.listen(port, () => {console.log(`Listening on port ${port}...`)})})
    .catch(err => console.log('Could not connect to MongoDB...', err))

