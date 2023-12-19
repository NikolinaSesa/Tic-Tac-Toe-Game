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
  Alert,
  AlertColor,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface ResultMessage {
  result: null | AlertColor;
  msg: string;
}

const Register = () => {
  const [player, setPlayer] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registrationResult, setRegistrationResult] = useState<ResultMessage>({
    result: null,
    msg: "",
  });
  const handleRegister = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/players/", player)
      .then(({ data }) => {
        setRegistrationResult({
          ...registrationResult,
          result: "success",
          msg: `Welcome ${data.name}. Login and start the game!`,
        });
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
      <div style={{width: "100%", height: "100vh", display: "flex", paddingTop: '50px', background: 'black'}}>
      <Container maxWidth="xs" sx={{height: "600px" , background: 'white', borderRadius: '10px', border: "5px solid rgb(58, 56, 55)"}}>
        <CssBaseline />
        <Box sx={{ mt: 5 }}>
          {registrationResult.result && (
            <Alert sx={{fontFamily: "FreeMono, monospace"}} severity={registrationResult.result}>
              {registrationResult.msg}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "FreeMono, monospace",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <GiPadlock />
          </Avatar>
          <Typography sx={{fontFamily: "FreeMono, monospace"}} variant="h5">Register</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={player.name}
              onChange={(event) =>
                setPlayer({ ...player, name: event.target.value })
              }

              InputLabelProps={{style: {fontFamily: "FreeMono, monospace"}}}
              inputProps={{style: {fontFamily: "FreeMono, monospace"}}}
            />
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="/">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
    </>
  );
};

export default Register;
