import auth, {ICustomReq} from "../middlewares/auth";
import Game, { IGame, IMove } from "../models/games";
import express, { Router, Request, Response } from 'express'

const router: Router = Router()

//showing all the moves
router.get('/', async (req: Request, res: Response) => {
    const games = await Game.find({}).populate([{path: 'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    return res.send(games)
})

//get a history for a game by id
router.get('/:id', async (req: Request, res: Response) => {
    const game = await Game.findById({_id: req.params.id}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    if(!game) return res.status(404).send('Game is not found.')

    res.send(game)
})

//create a new game
router.post('/', auth, async (req: Request, res: Response) => {
    const game = new Game({player1: (req as ICustomReq).player._id, currentPlayer: (req as ICustomReq).player._id})
    await game.save()

    res.send(game)
})

//join an existing game
router.put('/:id', auth, async (req: Request, res: Response) => {
    const game = await Game.findByIdAndUpdate({_id: req.params.id}, {$set: {player2: (req as ICustomReq).player._id}}, {new: true}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    res.send(game)
})

//make a new move
router.put('/make-a-move/:id', auth, async (req: Request, res: Response) => {
    const move: IMove = req.body
    let game = await Game.findById(req.params.id)
    if(game?.currentPlayer != move.player) return res.status(400).send('Not your turn.')

    game = await Game.findByIdAndUpdate(game.id, {$push: {moves: move}}, {new: true})

    if(String(game?.currentPlayer) === String(game?.player1)) game = await Game.findByIdAndUpdate(game?.id, {currentPlayer: game?.player2}, {new: true})
    else game = await Game.findByIdAndUpdate(game?.id, {currentPlayer: game?.player1}, {new: true})

    res.send(game)
})

export default router
