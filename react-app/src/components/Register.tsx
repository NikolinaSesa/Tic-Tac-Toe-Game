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
} from "@mui/material";
import { useState } from "react";

const Register = () => {
  const [player, setPlayer] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    console.log(player);
  };
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
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
              autoFocus
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
              autoFocus
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
              onClick={handleSubmit}
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
