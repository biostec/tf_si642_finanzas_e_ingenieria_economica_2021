import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style.js";
import { withRouter, Redirect } from "react-router";
import app from "../../base.js";
import { AuthContext } from "../../Auth.js";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Copyright from "./Copyrigth";

const InicioSesion = ({ register, setRegister }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(email);
      console.log(password);
      await app.auth().signInWithEmailAndPassword(email.trim(), password);
      history.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio Sesión
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electronico"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recordar contraseña"
        />
        {/* <br />
          <button type="submit">Log in</button> */}
        <Button
          type="submit"
          fullWidth
          id="button"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Confirmar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Olvido Contraseña?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => setRegister(!register)}
            >
              {"No tiene una cuenta? Registrese ahora!"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    </Grid>
  );
};

export default withRouter(InicioSesion);
