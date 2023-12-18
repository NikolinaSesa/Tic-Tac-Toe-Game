import mongoose from "mongoose";

enum Sign { X = 'X', O = 'O' }

export interface IMove{
    spot: number,
    sign: string,
    player: mongoose.Types.ObjectId
}

export interface IGame extends mongoose.Document {
    player1: mongoose.Types.ObjectId,
    player2?: mongoose.Types.ObjectId,
    winner?: mongoose.Types.ObjectId,
    moves?: mongoose.Types.DocumentArray<IMove> 
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
        moves: {
            type: [{
                spot: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 8
                },
                sign: {
                    type: typeof Sign,
                    required: true
                },
                player: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Player'
                }
            }],
            maxlength: 9
        }
    },
    {
        timestamps: true
    }
)

const Game = mongoose.model<IGame>('Game', GameSchema)

export default Game
