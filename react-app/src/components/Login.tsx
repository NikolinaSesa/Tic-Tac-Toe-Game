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
import { useState } from "react";
import axios from "axios";

interface ResultMessage {
  result: null | AlertColor;
  msg: string;
}

const Login = () => {
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
        window.location.href = "/firstPage";
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
      <Container maxWidth="xs">
        <CssBaseline />
        <Box sx={{ mt: 20 }}>
          {registrationResult.result && (
            <Alert severity={registrationResult.result}>
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
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <GiPadlock />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
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
            />
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
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
    </>
  );
};

export default Login;
