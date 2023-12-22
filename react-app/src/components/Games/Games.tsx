import { Avatar, Grid, Paper, Typography } from "@mui/material";
import "./Games.css";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import { useState } from "react";

interface IGame {
  _id: string;
  player1: IPlayer;
  player2: IPlayer;
}

interface IPlayer {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  games: IGame[];
  onClick: (gameId: string) => void;
  finishedGames: Boolean;
}

const Games = ({ games, onClick, finishedGames }: Props) => {

  const [searchItem, setSearchItem] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);

  const searchHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value
    setSearchItem(searchItem);

    const filteredGames = games.filter((game) => game.player1.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                                        game.player2?.name.toLowerCase().includes(searchItem.toLowerCase())
                                      )

    setFilteredGames(filteredGames)
  }

  return (
    <>
      <div className="search">
        <input
            type="text"
            placeholder="Search"
            className="searchBox"
            value={searchItem}
            onChange={searchHandler}
        />
      </div>
      <div className="grid">
        <Grid container spacing={4}>
          {filteredGames.map((val) => (
            <Grid item key={val._id} xs={4}>
              <Paper
                className="paper"
                elevation={6}
                onClick={() => onClick(val._id)}
              >
                <Avatar className="avatar">
                  <SportsEsportsOutlinedIcon></SportsEsportsOutlinedIcon>
                </Avatar>
                {!finishedGames && <Typography sx={{fontFamily: "FreeMono, monospace", fontWeight: 'bold'}}>Join the game</Typography>}
                <Typography sx={{fontFamily: "FreeMono, monospace"}}><b>Player 1:</b> {val.player1.name}</Typography>
                {finishedGames && <Typography sx={{fontFamily: "FreeMono, monospace"}}><b>Player 2:</b> {val.player2 ? val.player2.name : 'AI Player'}</Typography>}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Games;
