import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Container,
  Button,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const CrearFactura = () => {
  const [fechaEmision, setFechaEmision] = useState(new Date());
  const [fechaPago, setFechaPago] = useState(new Date());
  const [coin, setCoin] = useState("pen");
  return (
    <div className="container">
      <CssBaseline />

      {/* RUC de la Empresa */}
      <Container container sm={12} className="mt-4">
        <Grid item="center">
          <Typography variant="h5">Ingresar Factura</Typography>
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor="ruc">RUC de la Empresa </InputLabel>
              <Input id="ruc" aria-describedby="ruc-helper" />
              {/* <FormHelperText id="ruc-helper">
                Coloque el RUC de la empresa deudora
              </FormHelperText> */}
            </FormControl>
          </Grid>

          {/* Razon Social */}
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor="razon">Razon Social </InputLabel>
              <Input id="razon" aria-describedby="razon-helper" />
              {/* <FormHelperText id="razon-helper">
                Coloque la Razon Social de la Empresa
              </FormHelperText> */}
            </FormControl>
          </Grid>

          {/* RUC de la Empresa */}
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Número de la Factura </InputLabel>
              <Input id="numero" aria-describedby="numero-helper" />
              {/* <FormHelperText id="numero-helper">Coloque el número de la factura</FormHelperText> */}
            </FormControl>
          </Grid>

          {/* Moneda a utilizar */}
          <Grid item md={12} className="mt-4">
            <FormControl component="fieldset">
              <FormLabel component="legend">Moneda</FormLabel>
              <RadioGroup
                aria-label="moneda"
                name="moneda"
                value={coin}
                onChange={(event) => {
                  setCoin(event.target.value);
                }}
              >
                <FormControlLabel value="pen" control={<Radio />} label="PEN" />
                <FormControlLabel value="usd" control={<Radio />} label="USD" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Fecha de Emisión */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item md={12} className="mt-4">
              <FormLabel component="legend">Fecha de emision</FormLabel>
              <DatePicker
                autoOk
                disableFuture
                value={fechaEmision}
                views={["year", "month", "date"]}
                onChange={setFechaEmision}
                format="dd/MM/yyyy"
                openTo="year"
              />
            </Grid>
          </MuiPickersUtilsProvider>

          {/* Fecha de Pago */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item md={12} className="mt-4">
              <FormLabel component="legend">Fecha de pago</FormLabel>
              <DatePicker
                autoOk
                disableFuture
                value={fechaPago}
                views={["year", "month", "date"]}
                onChange={setFechaPago}
                format="dd/MM/yyyy"
                openTo="year"
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Button className="my-4" variant="contained">
          Enviar
        </Button>
      </Container>
    </div>
  );
};

export default CrearFactura;
