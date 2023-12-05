import mongoose from "mongoose";

const Game = mongoose.model('Game', new mongoose.Schema({
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
    //createdAt: {type: Date} -> get from ObjectID
    moves: {
        type: Array,
        require: true,
        default: []
    }
}))

export default Game