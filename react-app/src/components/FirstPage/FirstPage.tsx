import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./FirstPage.css";
import Board, { IPlayer, IGame } from "../Board/Board";
import Games from "../Games/Games";

const FirstPage = () => {
  const [player, setPlayer] = useState<IPlayer>({
    _id: "",
    name: "",
    email: "",
  });

  const [game, setGame] = useState<IGame>({
    _id: "",
    player1: {
      _id: "",
      name: "",
      email: "",
    },
    player2: {
      _id: "",
      name: "",
      email: "",
    },
  });

  const [games, setGames] = useState<IGame[]>([]);

  const [showButtons, setShowButtons] = useState(true);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<IPlayer>("http://localhost:5000/api/players/currentPlayer", {
        signal: controller.signal,
        headers: {
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        setPlayer({
          ...player,
          _id: data._id,
          name: data.name,
          email: data.email,
        });
      })
      .catch((err) => console.log(err.response.data));
    return () => controller.abort();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setPlayer({ ...player, _id: "", name: "", email: "" });
    window.location.href = "../";
  };

  const handleCreateNewGame = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .post<IGame>(
        "http://localhost:5000/api/games/",
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(({ data }) => {
        setGame({
          ...game,
          _id: data._id,
          player1: {
            ...game.player1,
            _id: data.player1._id,
            name: data.player1.name,
            email: data.player1.email,
          },
          player2: {
            ...game.player2,
            _id: "",
            name: "",
            email: "",
          },
        });

        setShowButtons(false);
        setShowGameBoard(true);
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleJoining = () => {
    axios
      .get<IGame[]>("http://localhost:5000/api/games/existingGames", {
        headers: {
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        setGames(data.filter((game) => !game.player2));

        setShowButtons(false);
        setShowGames(true);
      })
      .catch((err) => console.log(err));
  };

  const handleJoin = (gameId: string) => {
    const token = localStorage.getItem("accessToken");
    axios
      .put<IGame>(
        "http://localhost:5000/api/games/" + gameId,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(({ data }) => {
        setGame({
          ...game,
          _id: data._id,
          player1: {
            ...game.player1,
            _id: data.player1._id,
            name: data.player1.name,
            email: data.player1.email,
          },
          player2: {
            ...game.player2,
            _id: data.player2._id,
            name: data.player2.name,
            email: data.player2.email,
          },
        });

        setShowGameBoard(true);
        setShowGames(false);
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleHistory = () => {
    axios
      .get<IGame[]>("http://localhost:5000/api/games/", {
        headers: {
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        setGames(data);

        setShowButtons(false);
        setShowGameBoard(false);
        setShowGames(false);
        setShowHistory(true);
      })
      .catch((err) => console.log(err));
  };

  const handleHistoryOfGame = (id: String) => {
    axios
      .get<IGame>("http://localhost:5000/api/games/"+id, {
        headers: {
          'x-auth-token': localStorage.getItem('accessToken')
        }
      })
      .then(({data}) => {
        setGame(data);
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="div">
        <div className="sidebarDiv">
          <Sidebar
            name={player.name}
            onLogout={handleLogout}
            onCreateNewGame={handleCreateNewGame}
            onJoin={handleJoining}
            onHistory={handleHistory}
          />
        </div>
        <div className="mainDiv">
          {showButtons && (
            <div className="buttonDiv">
              <button
                id="createButton"
                className="button"
                onClick={handleCreateNewGame}
              >
                Create new game
              </button>
              <p>OR</p>
              <button className="button" onClick={handleJoining}>
                Join the game
              </button>
            </div>
          )}
          {showGameBoard && <Board game={game} />}
          {showGames && <Games games={games} onClick={handleJoin} finishedGames={false}/>}
          {showHistory && <Games games={games} onClick={handleHistoryOfGame} finishedGames={true}/>}
        </div>
      </div>
    </>
  );
};

export default FirstPage;
