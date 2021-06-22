import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormLabel from "@material-ui/core/FormLabel";

const CalcTCEA = () => {
  //   const [diasAnio, setDiasAnio] = useState("");
  //   const [plazo, setPlazo] = useState("");
  //   const [tasa, setTasa] = useState("");
  //   const [fechaDescuento, setFechaDescuento] = useState(new Date());

  const [state, setState] = useState({
    diasAnio: "",
    plazo: "",
    tasa: "",
    fechaDescuento: new Date(),
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 col-sm-6">
          {/*Dias Año */}
          <FormControl variant="outlined" className="d-block mb-3">
            <InputLabel htmlFor="outlined-age-native-simple">
              Dias Año
            </InputLabel>
            <Select
              native
              value={state.diasAnio}
              onChange={handleChange}
              label="Dias Año"
              inputProps={{
                name: "diasAnio",
                id: "diasAnio",
              }}
            >
              <option aria-label="None" value="" />
              <option value={360}>360 días</option>
              <option value={365}>365 días</option>
            </Select>
          </FormControl>

          {/* Plazo de Tasa */}
          <FormControl variant="outlined" className="d-block">
            <InputLabel htmlFor="outlined-age-native-simple">
              Plazo de Tasa
            </InputLabel>
            <Select
              native
              value={state.plazo}
              onChange={handleChange}
              label="Plazo de Tasa"
              inputProps={{
                name: "plazo",
                id: "plazo",
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>Diario</option>
              <option value={15}>Quincenal</option>
              <option value={30}>Mensual</option>
              <option value={60}>Bimestral</option>
              <option value={90}>Trimestral</option>
              <option value={120}>Cuatrimestral</option>
              <option value={180}>Semestral</option>
              <option value={360}>Anual</option>
            </Select>
          </FormControl>

          {/*Tasa Efectiva */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="tasa"
            label="Tasa"
            value={state.tasa}
            onChange={handleChange}
            name="tasa"
          />

          {/* Fecha de Descuento*/}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="mt-4">
              <FormLabel component="legend">Fecha de emision</FormLabel>
              <DatePicker
                autoOk
                value={state.fechaDescuento}
                views={["year", "month", "date"]}
                onChange={(e) => {
                  setState({
                    ...state,
                    fechaDescuento: e,
                  });
                }}
                format="dd/MM/yyyy"
                openTo="year"
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-12 col-sm-6"></div>
      </div>
    </div>
  );
};

export default CalcTCEA;
