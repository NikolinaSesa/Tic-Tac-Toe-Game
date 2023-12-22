import { GiPadlock } from "react-icons/gi";
import {
  Avatar,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  AlertColor,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { WindowContext } from "./ScreenSize";

interface ResultMessage {
  result: null | AlertColor;
  msg: string;
}

const Login = () => {
  const { clientHeight, clientWidth } = useContext(WindowContext)

  const [player, setPlayer] = useState({
    email: "",
    password: "",
  });
  const [registrationResult, setRegistrationResult] = useState<ResultMessage>({
    result: null,
    msg: "",
  });
  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/auth/", player)
      .then(({ data }) => {
        localStorage.setItem("accessToken", data);
        setRegistrationResult({
          ...registrationResult,
          result: null,
          msg: "",
        });
        window.open("http://localhost:5173/firstPage");
        setPlayer({email: '', password: ''})
      })
      .catch((err) => {
        console.log(err.response.data);
        setRegistrationResult({
          ...registrationResult,
          result: "error",
          msg: `${err.response.data}`,
        });
      });
  };
  return (
    <>
      <div style={{width: clientWidth, height: clientHeight, display: "flex", paddingTop: '50px', background: 'black'}}>
      <Container maxWidth="xs" sx={{ height: '525px' , background: 'white', borderRadius: '10px', border: "5px solid rgb(58, 56, 55)"}}>
        <CssBaseline />
        <Box sx={{ mt: 5}}>
          {registrationResult.result && (
            <Alert sx={{fontFamily: "FreeMono, monospace"}} severity={registrationResult.result}>
              {registrationResult.msg}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            mt: 5,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "FreeMono, monospace",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <GiPadlock />
          </Avatar>
          <Typography sx={{fontFamily: "FreeMono, monospace"}} variant="h5">Login</Typography>
          <Box sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={player.email}
              onChange={(event) =>
                setPlayer({ ...player, email: event.target.value })
              }

              InputLabelProps={{style: {fontFamily: "FreeMono, monospace"}}}
              inputProps={{style: {fontFamily: "FreeMono, monospace"}}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={player.password}
              onChange={(event) =>
                setPlayer({ ...player, password: event.target.value })
              }

              InputLabelProps={{style: {fontFamily: "FreeMono, monospace"}}}
              inputProps={{style: {fontFamily: "FreeMono, monospace"}}}
            />
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, fontFamily: "FreeMono, monospace" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
    </>
  );
};

export default Login;
