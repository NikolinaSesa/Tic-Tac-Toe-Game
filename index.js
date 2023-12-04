import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';

dotenv.config()

const app = express()

app.use(helmet())
app.use(express.json())

const port = process.env.PORT
const mongoDB = process.env.MONGODB 

mongoose.connect(mongoDB)
    .then(() => {
        console.log('Connected to MongoDB...')
        app.listen(port, () => {console.log(`Listening on port ${port}...`)})})
    .catch(err => console.log('Could not connect to MongoDB...', err))

