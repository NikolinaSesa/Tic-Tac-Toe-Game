import {IPlayer, Player, validateCredentials, validatePlayer} from "../models/players"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Game, { IMove } from "../models/games"
import { io } from "../index"

dotenv.config()

const getCurrentPlayer = async (args: {token: string}) => {

    if(!args.token) return null

    try{
        const decoded = jwt.verify(args.token, process.env.TOKEN_SECRET_KEY ?? "")
        
        const player = await Player.findById(decoded)
    
    return player
   
    } catch(err) {
        return null
    }     
}

const getPlayers = async () => {

    const players = await Player.find({})

    return players
}

const registration = async (args: {name: string, email: string, password: string}) => {

    const error = validatePlayer({name: args.name, email: args.email, password: args.password} as IPlayer).error
    if(error) return null

    let player = await Player.findOne({email: args.email})
    if(player) return null

    player = new Player({name: args.name, email: args.email, password: args.password})
    
    const salt = await bcrypt.genSalt(10)
    player.password = await bcrypt.hash(player.password, salt)

    await player.save()

    return player
}

const login = async(args: {email: String, password: String}) => {

    const error = validateCredentials({email: args.email, password: args.password} as IPlayer).error
    if(error) return null

    let player = await Player.findOne({email: args.email})
    if(!player) return null

    const validPassword = await bcrypt.compare(args.password.toString(), player.password)
    if(!validPassword) return null

    const token = player.generateAuthToken() as String

    return token
}

const getGame = async (args: {id: String}) => {

    const game = await Game.findById({_id: args.id})
                            .populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}, {path: 'moves.player', select: '-password'}])
    
    if(!game) return null

    return game
}

const getFinishedGames = async () => {

    const games = await Game.find({winner: {$exists: true}})
                            .populate([{path: 'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    
    return games
}

const getUnfinishedGames = async () => {

    const games = await Game.find({winner: {$exists: false}, player2: {$exists: false}})
                            .populate({ path: 'player1', select: '-password'})

    return games
}

const createNewGame = async (args: {player1: String, multiplayer: Boolean}) => {

    const game = new Game({player1: args.player1, multiplayer: args.multiplayer})

    await (await game.save())
                    .populate({path: 'player1', select: '-password'})

    return game
}

const joinExistingGame = async (args: {id: String, player2: String}) => {

    const game = await Game.findByIdAndUpdate({_id: args.id}, {$set: {player2: args.player2}}, {new: true})
                            .populate([{path:'player1', select: '-password'}, {path: 'player2', select: '-password'}])
    
    io.emit("gameState", game)
    return game
}

const saveGameResult = async (args: {id: String, winner: String, moves: [IMove]}) => {

    const game = await Game.findByIdAndUpdate({_id: args.id}, {$set: {winner: args.winner, moves: args.moves}}, {new: true})
    
    return game
}


export const root = {
    getCurrentPlayer,
    getPlayers,
    registration,
    login,
    getGame,
    getFinishedGames, 
    getUnfinishedGames,
    createNewGame,
    joinExistingGame,
    saveGameResult,
}