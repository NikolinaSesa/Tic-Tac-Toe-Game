import express from 'express'
import bcrypt from 'bcrypt'
import {Player, validateCredentials} from '../models/players.js'

const router = express.Router()

//login 
router.post('/', async (req, res) => {
    const {_, error} = validateCredentials(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let player = await Player.findOne({email: req.body.email})
    if(!player) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, player.password)
    if(!validPassword) return res.status(400).send('Invalid email or password.')

    const token = player.generateAuthToken()

    res.send(token)
})

export default router