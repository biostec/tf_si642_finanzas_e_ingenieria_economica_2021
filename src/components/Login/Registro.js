import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const Registro = ({ register, setRegister }) => {
  return (
    <div>
      <button disabled>Registrarse</button>
      <Grid item>
        <Link href="#" variant="body2" onClick={() => setRegister(!register)}>
          {"Ya tengo una cuenta!"}
        </Link>
      </Grid>
    </div>
  );
};

export default Registro;
