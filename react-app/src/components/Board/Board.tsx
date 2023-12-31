import Square from "./Square";
import "./Board.css";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal/Modal";
import axios from "axios";
import { io } from "socket.io-client";
import Typography from "@mui/material/Typography/Typography";
import { Box, Button } from "@mui/material";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import Avatar from "@mui/material/Avatar";
import { token } from "../FirstPage/FirstPage";

export interface IGame {
  _id: string;
  player1: IPlayer;
  player2: IPlayer;
  winner?: String | null;
  moves?: IMove[];
  multiplayer?: boolean;
}

export interface IMove {
  spot: number | null;
  sign: string | null;
  player?: IPlayer | null;
}

export interface IPlayer {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  game: IGame;
  player: IPlayer;
  onExit: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid rgb(58, 56, 55)',
  borderRadius: '10px',
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
}

const Board = ({ game, player, onExit }: Props) => {

  const socket = io("http://localhost:5000")

  const [gameState, setGameState] = useState<IGame>(game)
  const [board, setBoard] = useState(Array<string | null>(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [moves, setMoves] = useState<IMove[]>([])
  const [winner, setWinner] = useState<String | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<String | null>(null)

  useEffect(() => {

    socket.on("gameState", (data) => {
      setGameState(data)
      setCurrentPlayer(data.player1._id)
    })

    socket.on("receiveMove", (data) => {
      setBoard(data.boardCopy);
      setMoves(data.movesCopy);
      setXIsNext(data.xIsNext);
      setWinner(getWinner(data.boardCopy));
      setCurrentPlayer(data.currentPlayer)
    })

    socket.on("reset", () => {
      setBoard(Array<string | null>(9).fill(null));
      setMoves([])
      setCurrentPlayer(gameState.player1._id);
      setXIsNext(true);
    })
  }, [])

  const handleClick = (i: number) => {
   
    if(currentPlayer != player._id) return

    const boardCopy = [...board]
    const movesCopy = [...moves]

    if (boardCopy[i] || getWinner(boardCopy)) return

    if(xIsNext) {
      boardCopy[i] = "X"
      movesCopy.push({sign: "X", spot: i, player: game.player1})
    }
    else{
      boardCopy[i] = "O"
      movesCopy.push({sign: "O", spot: i, player: game.player2})
    }

    let nextPlayer: String = ""
    currentPlayer === gameState.player1._id ? nextPlayer = gameState.player2._id : nextPlayer = gameState.player1._id

    socket.emit("sendMove", {"boardCopy": boardCopy, "movesCopy": movesCopy, "xIsNext": !xIsNext, "currentPlayer": nextPlayer})

  }

  const handleExit = () => {

    const finishedGame: IGame = {
      _id: gameState._id,
      player1: gameState.player1,
      player2: gameState.player2,
      winner: winner,
      moves: moves
    }

    axios.put("http://localhost:5000/api/games/", finishedGame, {
            headers: {
              'x-auth-token': token
            }
          })
          .then(() => onExit())
          .catch((err) => console.log(err))
  }

  const handleReset = () => {
    
    socket.emit('reset')

  }

  return (
    <>
      <div className="resetDiv">
        <Avatar sx={{cursor: 'pointer'}} onClick={handleReset}>
          <RestartAltOutlinedIcon></RestartAltOutlinedIcon>
        </Avatar>
      </div>
      <div className="board">
        {board.map((val, i) => (
          <Square key={i} value={val} i={i} onClick={handleClick}></Square>
        ))}
      </div>
      <div className="gameInfo">
        <div className="info">
          <p className="p">PLAYER 1: </p>
          <p className="p2">{gameState.player1.name}</p>
        </div>
        <div className="info">
          <p className="p">PLAYER 2: </p>
          {game.player2 ? <p className="p2">{gameState.player2.name}</p> : <p></p>}
        </div>
      </div>
      <Modal 
        open={winner != null}
        onClose={handleExit}
      >
          <Box sx={style}>
            <Typography variant="h6" sx={{fontFamily: 'FreeMono, monospace'}}>GAME OVER</Typography>
            <Typography variant="h5" sx={{fontFamily: 'FreeMono, monospace', mt: '5px'}}>Winner is {winner}</Typography>
            <Button variant="outlined" sx={{fontFamily: 'FreeMono, monospace', mt: '15px', width: '150px'}} onClick={handleExit}>Exit</Button>
          </Box>
      </Modal>
    </>
  );
};


function getWinner(board : Array<string | null>) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i< lines.length; i++){

    const [a, b, c] = lines[i]

    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      return board[a]
    }
  }
  return null
}

export default Board