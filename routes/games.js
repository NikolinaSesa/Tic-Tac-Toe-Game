import Game from '../models/games.js'
import express from 'express'
import _ from 'lodash'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async (req, res) => {
    const games = await Game.find().populate('player1')
    res.send(games)
})

router.get('/:id', async (req, res) => {
    const game = await Game.findById({_id: req.params.id}).populate('player1')
    if(!game) return res.status(404).send('Game is not found.')

    res.send(game)
})

router.post('/', async (req, res) => {
    const game = new Game(_.pick(req.body, ['player1', 'moves']))
    await game.save()

    res.send(game)
})

export default router
