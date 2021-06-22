import React, { useState } from "react";
import { withRouter } from "react-router";
import { auth, firestore } from "../../utils/firebase";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import Avatar from "@material-ui/core/Avatar";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style.js";

const Registro = ({ history, register, setRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [ruc, setRuc] = useState("");
  const [dni, setDni] = useState("");

  const classes = useStyles();

  const [leyenda, setleyenda] = React.useState("");

  const handleSubmit = () => {
    firestore
      .collection("profiles")
      .add({
        uid: auth.currentUser.uid,
        nombre: name,
        apellido: lastName,
        ruc: ruc,
        fechaNacimiento: birthday,
        dni: dni,
      })
      .then((docRef) => {
        history.push("/home");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert(error);
      });
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email.trim(), password);
      handleSubmit();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Registro
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Apellido"
          name="lastName"
          autoComplete="lastName"
          autoFocus
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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
          fullWidth
          id="ruc"
          label="RUC (Opcional)"
          name="ruc"
          autoComplete="ruc"
          autoFocus
          value={ruc}
          onChange={(e) => setRuc(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="dni"
          label="DNI"
          name="dni"
          autoComplete="dni"
          autoFocus
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Fecha de Nacimiento"
          type="date"
          defaultValue="2017-05-24"
          id="birthday"
          name="birthday"
          autoComplete="birthday"
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
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
