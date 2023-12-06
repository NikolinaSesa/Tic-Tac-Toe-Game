import auth from '../middlewares/auth.js'
import Game from '../models/games.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    const games = await Game.find().populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    res.send(games)
})

//get a history for a game by id
router.get('/:id', async (req, res) => {
    const game = await Game.findById({_id: req.params.id}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    if(!game) return res.status(404).send('Game is not found.')

    res.send(game)
})

//create a new game
router.post('/', auth, async (req, res) => {
    const game = new Game({player1: req.player})
    await game.save()

    res.send(game)
})

//join an existing game
router.put('/:id', auth, async (req, res) => {
    const game = await Game.findByIdAndUpdate({_id: req.params.id}, {$set: {player2: req.player}}, {new: true}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    res.send(game)
})

export default router
