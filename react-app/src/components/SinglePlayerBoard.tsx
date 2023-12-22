import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { useState } from "react";
import { IGame, IMove } from "./Board/Board";
import './Board/Board.css'
import Square from "./Board/Square";
import axios from "axios";
import { token } from "./FirstPage/FirstPage";

interface Props {
    game: IGame
    onExit: () => void
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

const SinglePlayerBoard = ({game, onExit} : Props) => {

    const [board, setBoard] = useState(Array<string | null>(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [moves, setMoves] = useState<IMove[]>([]);
    const [winner, setWinner] = useState<String | null>(null);

    const handleClick = (i: number) => {
       
        if (board[i] || getWinner(board) || !xIsNext) return;

        setBoard(board.map((square, index) => index === i ? square = "X" : square));
        setMoves([...moves, {spot: i, sign: "X", player: game.player1}]);
        setXIsNext(false);

        setWinner(getWinner(board.map((square, index) => index === i ? square = "X" : square)));

        const boardCopy = board.map((square, index) => index === i ? square = "X" : square)
        const movesCopy = [...moves, {spot: i, sign: "X", player: game.player1}]
        const aiMoveSpot: number | null = aiMove(boardCopy, false);

        if(aiMoveSpot === null) return;

        setBoard(boardCopy.map((square, index) => index === aiMoveSpot ? square = "O" : square));
        setMoves([...movesCopy, {spot: aiMoveSpot, sign: "O"}]);
        setXIsNext(true);
        
        setWinner(getWinner(boardCopy.map((square, index) => index === aiMoveSpot ? square = "O" : square)));
    };

    const handleReset = () => {
        setBoard(Array<string | null>(9).fill(null));
        setXIsNext(true);
        setMoves([])
    }

    const handleExit = () => {
        const finishedGame: IGame = {
            _id: game._id,
            player1: game.player1,
            player2: game.player2,
            winner: winner,
            moves: moves
        }
        axios.put("http://localhost:5000/api/games/", finishedGame, {
            headers: {
                'x-auth-token': token
            }
        }).then(() => {
            onExit();
        }).catch((err) => console.log(err))    
    }

    return(
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
                    <p className="p2">{game.player1.name}</p>
                </div>
                <div className="info">
                    <p className="p">PLAYER 2: </p>
                    <p className="p2">AI Player</p> 
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
    )
}

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

function aiMove(board : Array<string | null>, xIsNext: boolean): number | null{

    if(getWinner(board) || xIsNext) return null; 

    const emptyIndexies = Array<number>();
    board.map((val, index) => {
        if(val != "X" && val != "O"){
            emptyIndexies.push(index)
        }
    })
    
    for(let i = 0; i < emptyIndexies.length; i++){
        const boardCopy = [...board];
        boardCopy[emptyIndexies[i]] = "O";
        if(getWinner(boardCopy)) return emptyIndexies[i];    
    }

    for(let i = 0; i < emptyIndexies.length; i++){
        const boardCopy = [...board];
        boardCopy[emptyIndexies[i]] = "X";
        if(getWinner(boardCopy)) return emptyIndexies[i];    
    }

    return emptyIndexies[0];
}

export default SinglePlayerBoard;