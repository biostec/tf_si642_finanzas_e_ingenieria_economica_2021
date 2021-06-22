import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
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
import { auth, firestore } from "../../utils/firebase";
import { useHistory } from "react-router-dom";

const CrearFactura = () => {
  const history = useHistory();
  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [monto, setMonto] = useState("");
  const [coin, setCoin] = useState("pen");
  const [nFactura, setNFactura] = useState("");
  const [fechaEmision, setFechaEmision] = useState(new Date());
  const [fechaPago, setFechaPago] = useState(new Date());

  const handleSubmit = () => {
    firestore
      .collection("facturas")
      .add({
        uid: auth.currentUser.uid,
        ruc: ruc,
        razonSocial: razonSocial,
        monto: monto,
        coin: coin,
        nFactura: nFactura,
        fechaEmision: fechaEmision,
        fechaPago: fechaPago,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        history.push("/historialFacturas");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert(error);
      });
  };

  return (
    <div className="container">
      <CssBaseline />

      <Container container sm={12} className="mt-4">
        <Grid item="center">
          <Typography variant="h5">Ingresar Factura</Typography>

          {/* RUC de la Empresa */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ruc"
            label="RUC de la Empresa "
            value={ruc}
            onChange={(e) => {
              setRuc(e.target.value);
            }}
          />

          {/* Razon Social */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="razon-social"
            label="Razon Social"
            name="razon-social"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
          />

          {/* RUC de la Empresa */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="n-factura"
            label="Número de la Factura"
            name="n-factura"
            value={nFactura}
            onChange={(e) => setNFactura(e.target.value)}
          />

          {/* Monto */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="monto"
            label="Monto"
            name="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />

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
        <Button className="my-4" variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
      </Container>
    </div>
  );
};

export default CrearFactura;
