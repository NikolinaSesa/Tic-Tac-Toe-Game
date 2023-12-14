import { Grid, Paper, Typography } from "@mui/material";
import "./Games.css";
import { useEffect, useState } from "react";
import axios from "axios";

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

const Game = () => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get<IGame>("http://localhost:5000/api/games/", {
        headers: {
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        setGames([...games, data]);
        console.log(data);
      })
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="grid">
        <Grid container spacing={4}>
          {games.map((val) => (
            <Grid item key={val._id} xs={4}></Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Game;
