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
          <Typography variant="h5">Register</Typography>
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
