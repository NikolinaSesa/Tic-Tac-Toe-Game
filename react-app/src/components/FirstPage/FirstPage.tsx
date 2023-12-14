import axios from "axios";
//import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./FirstPage.css";
import Board from "../Board/Board";
import Game from "../Games/Games";

interface IPlayer {
  _id: string;
  name: string;
  email: string;
}

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

const FirstPage = () => {
  const [player, setPlayer] = useState<IPlayer>({
    _id: "",
    name: "",
    email: "",
  });

  const [createButton, setCreateButton] = useState(false);
  const [joinButton, setJoinButton] = useState(false);
  const [historyButton, setHistoryButton] = useState(false);

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

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get<IPlayer>("http://localhost:5000/api/players/currentPlayer", {
        signal: controller.signal,
        headers: {
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) =>
        setPlayer({
          ...player,
          _id: data._id,
          name: data.name,
          email: data.email,
        })
      )
      .catch((err) => console.log(err.response.data));
    return () => controller.abort();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setPlayer({ ...player, _id: "", name: "", email: "" });
    setCreateButton(false);
    setJoinButton(false);
    setHistoryButton(false);
  };

  const handleCreateNewGame = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "http://localhost:5000/api/games/",
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setGame({
          ...game,
          _id: data._id,
          player1: data.player1,
        });
      })
      .catch((err) => console.log(err.response.data));

    setJoinButton(false);
    setHistoryButton(false);
    setCreateButton(true);
  };

  const handleJoin = () => {
    // const token = localStorage.getItem("accessToken");
    // axios
    //   .put(
    //     "http://localhost:5000/api/games/",
    //     {},
    //     {
    //       headers: {
    //         "x-auth-token": token,
    //       },
    //     }
    //   )
    //   .then(({ data }) => {
    //     console.log(data);
    //     setGame({
    //       ...game,
    //       player2: data.player2,
    //     });
    //   })
    //   .catch((err) => console.log(err.response.data));

    setCreateButton(false);
    setHistoryButton(false);
    setJoinButton(true);
  };

  const handleHistory = () => {
    setCreateButton(false);
    setJoinButton(false);
    setHistoryButton(true);
  };

  return (
    <>
      <div className="div">
        <div className="sidebarDiv">
          <Sidebar
            name={player.name}
            onLogout={handleLogout}
            onCreateNewGame={handleCreateNewGame}
            onJoin={handleJoin}
            onHistory={handleHistory}
          />
        </div>
        <div className="mainDiv">
          {createButton && <Board game={game} />}
          {joinButton && <Game />}
        </div>
      </div>
    </>
  );
};

export default FirstPage;
