import mongoose from "mongoose";

const Game = mongoose.model('Game', new mongoose.Schema(
    {
        player1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
            require: true
        },
        player2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        moves: {
            type: Array,
            require: true,
            default: []
        }
    },
    {
        timestamps: true
    }
))

export default Game