import mongoose from "mongoose"

export interface IMove{
    spot: number,
    sign: string,
    player: mongoose.Types.ObjectId
}

export interface IGame extends mongoose.Document {
    player1: mongoose.Types.ObjectId,
    player2?: mongoose.Types.ObjectId,
    winner?: string,
    moves?: mongoose.Types.DocumentArray<IMove>,
    multiplayer: boolean
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
        winner: String,
        moves: {
            type: [{
                spot: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 8
                },
                sign: {
                    type: String,
                    required: true
                },
                player: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Player'
                }
            }],
            maxlength: 9
        },
        multiplayer: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

const Game = mongoose.model<IGame>('Game', GameSchema)

export default Game
