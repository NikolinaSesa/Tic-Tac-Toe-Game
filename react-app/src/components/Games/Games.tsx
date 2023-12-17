import { Avatar, Grid, Paper, Typography } from "@mui/material";
import "./Games.css";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";

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
  games: IGame[];
  onClick: (gameId: string) => void;
}

const Games = ({ games, onClick }: Props) => {
  return (
    <>
      <div className="grid">
        <Grid container spacing={4}>
          {games.map((val) => (
            <Grid item key={val._id} xs={4}>
              <Paper
                className="paper"
                elevation={6}
                onClick={() => onClick(val._id)}
              >
                <Avatar className="avatar">
                  <SportsEsportsOutlinedIcon></SportsEsportsOutlinedIcon>
                </Avatar>
                <Typography>Join the game</Typography>
                <Typography>Player 1: {val.player1.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Games;
