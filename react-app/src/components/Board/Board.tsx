import Square from "./Square";
import "./Board.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export interface IGame {
  _id: string;
  player1: IPlayer;
  player2: IPlayer;
  winner?: IPlayer;
  moves?: IMove[];
}

export interface IMove {
  spot: number | null;
  sing: string | null;
  player: IPlayer | null;
}

export interface IPlayer {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  game: IGame;
}

const Board = ({ game }: Props) => {
  const socket = io("http://localhost:5000");
  const [gameState, setGameState] = useState<IGame>(game)

  const [board, setBoard] = useState(Array<string | null>(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const [moves, setMoves] = useState<IMove[]>([]);

  useEffect(() => {
    socket.on("gameState", (data) => {
      setGameState(data)
    })

    socket.on("receiveMove", (data) => {
      setBoard(data.boardCopy);
      setMoves(data.movesCopy);
      setXIsNext(data.xIsNext);
    })
  }, [])

  const handleClick = (i: number) => {
    const boardCopy = [...board];
    const movesCopy = [...moves];

    if (boardCopy[i] || getWinner(boardCopy)) return;

    if(xIsNext) {
      boardCopy[i] = "X";
      movesCopy.push({sing: boardCopy[i], spot: i, player: game.player1})
    }
    else{
      boardCopy[i] = "O";
      movesCopy.push({sing: boardCopy[i], spot: i, player: game.player2})
    }

    socket.emit("sendMove", {"boardCopy": boardCopy, "movesCopy": movesCopy, "xIsNext": !xIsNext})

  };

  const winner = getWinner(board);
  if(winner) {
    console.log({...gameState, winner: winner === "X" ? gameState.player1 : gameState.player2, moves: moves})
  }

  return (
    <>
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
  ];

  for(let i = 0; i< lines.length; i++){
    const [a, b, c] = lines[i];
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      return board[a];
    }
  }
  return null;
}


export default Board;
