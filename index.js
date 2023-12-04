import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config()

const app = express()

app.use(helmet())
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {console.log(`Listening on port ${port}...`)})