import { Box, Button, Modal, Typography } from "@mui/material";
import { IGame} from "../Board/Board";
import './Game.css'

interface Props {
    game: IGame;
    onExit: (show: boolean) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '4px solid rgb(58, 56, 55)',
    borderRadius: '10px',
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
}

const Game = ({game, onExit}: Props) => {

    const htmlDivs = Array<any>(9).fill(null)

    for(let i = 0; i < htmlDivs.length; i++){
        htmlDivs[i] = <div className="squareDiv"></div>
    }
    
    game.moves?.map((move) => {
        if(move.spot != null) 
            htmlDivs[move.spot] = <div className="squareDiv">{move.sign}</div>
    })


    return(
        <>
            <Modal open={true}>
                <Box sx={style}>
                    <Typography variant="h5" sx={{fontFamily: 'FreeMono, monospace'}}>GAME INFO</Typography>
                    <Typography variant="h6" sx={{fontFamily: 'FreeMono, monospace', mt: '10px'}}><b>Player 1: </b>{game.player1.name} "X"</Typography>
                    <Typography variant="h6" sx={{fontFamily: 'FreeMono, monospace', mt: '10px'}}><b>Player 2: </b>{game.player2 ? game.player2.name : 'AI Player'} "O"</Typography>
                    <Typography variant="h6" sx={{fontFamily: 'FreeMono, monospace', mt: '10px'}}><b>Winner: </b>"{game.winner}"</Typography>
                    <Typography variant="h6" sx={{fontFamily: 'FreeMono, monospace', mt: '10px'}}><b>Moves: </b></Typography>
                    <div className="boardDiv">
                        {htmlDivs}
                    </div>
                    <Button variant="outlined" sx={{fontFamily: 'FreeMono, monospace', mt: '40px', width: '150px'}} onClick={() => onExit(false)}>Exit</Button> 
                </Box>
            </Modal>
        </>
    )
    
}

export default Game