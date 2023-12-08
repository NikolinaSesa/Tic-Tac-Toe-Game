import mongoose from "mongoose";
import Joi from 'joi';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const playerSchema = new mongoose.Schema(
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
    },
    {
        methods: {
            generateAuthToken() {
                return jwt.sign({ _id: this._id}, process.env.TOKEN_SECRET_KEY)

            }
        }
    }
)

export const Player = mongoose.model('Player', playerSchema)

export function validatePlayer (player){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    })
    return schema.validate(player)
}

export function validateCredentials (req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    })
    return schema.validate(req)
}   

