import mongoose from "mongoose";

enum Sign { X = 'x', O = 'o' }

export interface IMove{
    x: number,
    y: number,
    sign: string,
    player: mongoose.Types.ObjectId
}

export interface IGame extends mongoose.Document {
    player1: mongoose.Types.ObjectId,
    player2?: mongoose.Types.ObjectId,
    winner?: mongoose.Types.ObjectId,
    currentPlayer?: mongoose.Types.ObjectId,
    moves: mongoose.Types.DocumentArray<IMove> 
}

const GameSchema = new mongoose.Schema<IGame>(
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
        currentPlayer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        moves: [{
            x: {
                type: Number,
                required: true,
                min: 0,
                max: 2
            },
            y: {
                type: Number,
                required: true,
                min: 0,
                max: 2
            },
            sign: {
                type: typeof Sign,
                required: true
            },
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player'
            }
        }]
    },
    {
        timestamps: true
    }
)

const Game = mongoose.model<IGame>('Game', GameSchema)

export default Game
