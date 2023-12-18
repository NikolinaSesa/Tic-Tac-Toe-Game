import auth, {ICustomReq} from "../middlewares/auth";
import Game, { IGame, IMove } from "../models/games";
import express, { Router, Request, Response } from 'express'
import { io } from "../index";

const router: Router = Router()

//get finished games 
router.get('/', async (req: Request, res: Response) => {
    const games = await Game.find({winner: {$exists: true}}).populate([{path: 'player1', select: '-password'}, {path: 'player2', select: '-password'}])
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
    const game = new Game({player1: (req as ICustomReq).player._id})
    await (await game.save()).populate({path: 'player1', select: '-password'})

    res.send(game)
})

//join an existing game
router.put('/:id', auth, async (req: Request, res: Response) => {
    const game = await Game.findByIdAndUpdate({_id: req.params.id}, {$set: {player2: (req as ICustomReq).player._id}}, {new: true}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    io.emit("gameState", game)
    res.send(game)
})

//save game result
router.put('/', auth, async (req: Request, res: Response) => {
    let game = req.body;
    game = await Game.findByIdAndUpdate({_id: game.id}, {$set: {winner: game.winner._id, moves: game.moves}}, {new: true});
    res.send(game);
})


export default router
