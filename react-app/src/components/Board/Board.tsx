import Square from "./Square";
import "./Board.css";
import { useState } from "react";

interface IGame {
  _id: string;
  player1: IPlayer;
  player2: IPlayer;
}

interface IMove {
  spot: number | null;
  sing: string | null;
  player: string | "";
}

interface IPlayer {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  game: IGame;
}

const Board = ({ game }: Props) => {
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
        <div className="info"></div>
        <div className="info"></div>
      </div>
    </>
  );
};

export default Board;
