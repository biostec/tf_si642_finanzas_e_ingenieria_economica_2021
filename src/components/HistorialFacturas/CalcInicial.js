import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CrearGastos from "./CrearGastos";
import ListaCostes from "./ListaCostes";

const CalcInicial = ({ state, handleChange, setState, facturaSelected }) => {
  return (
    <div className="mt-4">
      <h3 className="mb-3">Costes / Gastos Iniciales</h3>
      {/* Motivo */}
      <FormControl variant="outlined" className="d-block mb-3">
        <InputLabel htmlFor="outlined-age-native-simple">
          Motivo Inicial Tipo
        </InputLabel>
        <Select
          native
          value={state.MotivoInicialTipo}
          onChange={handleChange}
          label="Motivo Inicial Tipo"
          inputProps={{
            name: "motivoInicialTipo",
            id: "motivoInicialTipo",
          }}
        >
          <option aria-label="None" value="" />
          <option value={"portes"}>Portes</option>
          <option value={"fotocopias"}>Fotocopias</option>
          <option value={"comisionEstudio"}>Comision de Estudio</option>
          <option value={"comisionDesembolso"}>Comisión de Desembolso</option>
          <option value={"comisionIntermediacion"}>
            Comisión de Intermediación
          </option>
          <option value={"gastosAdm"}>Gastos de Administracion</option>
          <option value={"gastosNotariales"}>Gastos Notariales</option>
          <option value={"gastosRegistrales"}>Gastos Registrales</option>
          <option value={"seguro"}>Seguro</option>
          <option value={"otros"}>Otros Gastos</option>
        </Select>
      </FormControl>

      <div className="row">
        <div className="col mt-3">
          {/* Motivo Inicial Valor */}
          <FormControl variant="outlined" className="d-block">
            <InputLabel htmlFor="outlined-age-native-simple">
              Motivo Inicial Valor
            </InputLabel>
            <Select
              native
              value={state.motivoInicialValor}
              onChange={handleChange}
              label="Motivo Inicial Valor"
              inputProps={{
                name: "motivoInicialValor",
                id: "motivoInicialValor",
              }}
            >
              <option aria-label="None" value="" />
              <option value={"efectivo"}>En Efectivo</option>
              <option value={"porcentaje"}>En Porcentaje</option>
            </Select>
          </FormControl>
        </div>
        <div className="col">
          {/* Motivo Moneda */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="motivoInicialMonto"
            label="Motivo Inicial Monto"
            value={state.motivoInicialMonto}
            onChange={handleChange}
            name="motivoInicialMonto"
          />
        </div>
      </div>
      <CrearGastos
        facturaSelected={facturaSelected}
        type="inicial"
        state={state}
      />
      <ListaCostes facturaSelected={facturaSelected} type="inicial" />
    </div>
  );
};

export default CalcInicial;
