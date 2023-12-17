import Square from "./Square";
import "./Board.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export interface IGame {
  _id: string;
  player1: IPlayer;
  player2: IPlayer;
}

export interface IMove {
  spot: number | null;
  sing: string | null;
  player: string | "";
}

export interface IPlayer {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  game: IGame;
}

const socket = io("");

const Board = ({ game }: Props) => {
  // socket.on("connection", () => {
  //   console.log("Connected to server");
  // });

  // useEffect(() => {
  //   socket.on("receive_msg", (data) => {
  //     alert(data);
  //   });
  // }, [socket]);

  const [board, setBoard] = useState(Array<string | null>(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const boardCopy = [...board];

    if (boardCopy[i]) return;

    boardCopy[i] = xIsNext ? "X" : "O";

    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

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
          <p className="p2">{game.player1.name}</p>
        </div>
        <div className="info">
          <p className="p">PLAYER 2: </p>
          {game.player2 ? <p className="p2">{game.player2.name}</p> : <p></p>}
        </div>
      </div>
    </>
  );
};

export default Board;
