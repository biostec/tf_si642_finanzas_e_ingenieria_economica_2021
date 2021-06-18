import React, { useState } from "react";
import { withRouter } from "react-router";
import { auth } from "../../utils/firebase";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style.js";

const Registro = ({ history, register, setRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email.trim(), password);
      history.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electronico"
          name="email"
          autoComplete="email"
          autoFocus
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
        <Button
          type="submit"
          fullWidth
          id="button"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSignUp}
        >
          Confirmar
        </Button>
        <Grid item>
          <Link href="#" variant="body2" onClick={() => setRegister(!register)}>
            {"Ya tengo una cuenta!"}
          </Link>
        </Grid>
      </div>
    </Grid>
  );
};

export default withRouter(Registro);
