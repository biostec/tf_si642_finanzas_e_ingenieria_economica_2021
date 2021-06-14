import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import { Container, Button, CssBaseline, Grid ,Typography} from "@material-ui/core";
const CrearFactura = () => {
  return (
    <>
    <CssBaseline/>

    <Container maxWidth="md">
      <Grid container alignItems="center">
        <Typography variant="h2" >Ingrese su Factura !</Typography>
        <Grid item md={12}>
          <FormControl>
            {/* RUC de la Empresa */}
            <InputLabel htmlFor="ruc">Ruc de la Empresa </InputLabel>
            <Input id="ruc" aria-describedby="ruc-helper" />
            <FormHelperText id="ruc-helper">
              Coloque el RUC de la empresa deudora
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item md={12}>
          <FormControl>
            {/* Razon Social */}
            <InputLabel htmlFor="razon">Razon Social </InputLabel>
            <Input id="razon" aria-describedby="razon-helper" />
            <FormHelperText id="razon-helper">
              Coloque la Razon Social de la Empresa
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <FormControl>
            {/* RUC de la Empresa */}
            <InputLabel htmlFor="my-input">Número de la Factura </InputLabel>
            <Input id="numero" aria-describedby="numero-helper" />
            <FormHelperText id="numero-helper">Coloque el</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default CrearFactura;
