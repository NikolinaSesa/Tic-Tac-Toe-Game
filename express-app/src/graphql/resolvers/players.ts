import {IPlayer, Player, validateCredentials, validatePlayer} from "../../models/players"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

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

export const root = {
    getCurrentPlayer,
    getPlayers,
    registration,
    login
}