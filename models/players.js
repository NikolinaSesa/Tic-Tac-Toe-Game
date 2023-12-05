import mongoose from "mongoose";
import Joi from "joi";

const Player = mongoose.model('Player', new mongoose.Schema({
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
}))

export function validatePlayer(player) {
    const schema = Joi.object({ 
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(player)
}

export default Player