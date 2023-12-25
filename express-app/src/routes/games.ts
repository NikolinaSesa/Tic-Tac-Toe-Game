import auth, {ICustomReq} from "../middlewares/auth";
import Game, { IGame, IMove } from "../models/games";
import express, { Router, Request, Response } from 'express'
import { io } from "../index";
import { IPlayer } from "models/players";
import mongoose from "mongoose";

const router: Router = Router()

//get finished games 
router.get('/', auth, async (req: Request, res: Response) => {
    const games = await Game.find({winner: {$exists: true}}).populate([{path: 'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    return res.send(games)
})

//get existing games (unfinished)
router.get('/existingGames', auth, async(req: Request, res: Response) => {
    const games = await Game.find({winner: {$exists: false}, player1: {$ne: (req as ICustomReq).player._id}, player2: {$exists: false}}).populate({ path: 'player1', select: '-password'})
    return res.send(games);
})

//get a history for a game by id
router.get('/:id', auth, async (req: Request, res: Response) => {
    const game = await Game.findById({_id: req.params.id}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}, {path: 'moves.player', select: '-password'}])
    if(!game) return res.status(404).send('Game is not found.')

    res.send(game)
})

//create a new game
router.post('/', auth, async (req: Request, res: Response) => {
    const body: IGame = req.body as IGame
    const game = new Game({player1: (req as ICustomReq).player._id, multiplayer: body.multiplayer})
    await (await game.save()).populate({path: 'player1', select: '-password'})
    return res.send(game)
})

//join an existing game
router.put('/:id', auth, async (req: Request, res: Response) => {
    const game = await Game.findByIdAndUpdate({_id: req.params.id}, {$set: {player2: (req as ICustomReq).player._id}}, {new: true}).populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    io.emit("gameState", game)
    res.send(game)
})

//save game result
router.put('/', auth, async (req: Request, res: Response) => {
    let game: IGame | null  = req.body as IGame;
    game = await Game.findByIdAndUpdate({_id: game._id}, {$set: {winner: game.winner, moves: game.moves}}, {new: true});
    res.send(game);
})


export default router
