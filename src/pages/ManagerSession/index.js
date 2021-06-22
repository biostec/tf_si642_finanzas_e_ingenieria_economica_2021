import React, { useState } from "react";
import InicioSesion from "../../components/ManagerSession/InicioSesion";
import Registro from "../../components/ManagerSession/Registro";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./../../components/ManagerSession/style.js";

const ManagerSession = () => {
  const classes = useStyles();
  const [register, setRegister] = useState(false);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <React.Fragment>
        {register ? (
          <Registro register={register} setRegister={setRegister} />
        ) : (
          <InicioSesion register={register} setRegister={setRegister} />
        )}
      </React.Fragment>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
    </Grid>
  );
};

export default ManagerSession;
