import mongoose from "mongoose";
import Joi, { ValidationResult } from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export interface IPlayer extends mongoose.Document{ 
    name?: string,
    email: string,
    password: string,
    generateAuthToken() : string
}

const PlayerSchema = new mongoose.Schema<IPlayer>(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    }
)

PlayerSchema.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id}, process.env.TOKEN_SECRET_KEY ?? "")
}

export const Player = mongoose.model<IPlayer>('Player', PlayerSchema)

export function validatePlayer (player: IPlayer): ValidationResult{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    })
    return schema.validate(player)
}

export function validateCredentials (player: IPlayer): ValidationResult{
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    })
    return schema.validate(player)
}