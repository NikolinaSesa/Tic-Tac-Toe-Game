import Player from '../models/players.js'
import validatePlayer from '../models/players.js'
import express from 'express'
import _ from 'lodash'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async (req, res) => {
    const players = await Player.find()
    res.send(players)
})

router.get('/:id', async (req, res) => {
    const player = await Player.findById({_id: req.params.id})
    if(!player) return res.status(404).send('Player is not found.')

    res.send(player)

})

router.post('/', async (req, res) => {
    
    let player = await Player.findOne({email: req.body.email})
    if(player) return res.status(400).send('Player with entered email already exists.')

    player = new Player(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    player.password = await bcrypt.hash(player.password, salt)
    await player.save()
    
    res.send(_.pick(player, ['_id','name', 'email']))
})

export default router
