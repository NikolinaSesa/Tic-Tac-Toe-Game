import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Player {
  name: string;
  email: string;
}

const FirstPage = () => {
  const [player, setPlayer] = useState<Player>({
    name: "",
    email: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Player>("http://localhost:5000/api/players/currentPlayer", {
        signal: controller.signal,
        headers: {
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) =>
        setPlayer({ ...player, name: data.name, email: data.email })
      )
      .catch((err) => console.log(err.response.data));

    return () => controller.abort();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setPlayer({ ...player, name: "", email: "" });
  };

  return (
    <>
      <Typography>{player.name}</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default FirstPage;
