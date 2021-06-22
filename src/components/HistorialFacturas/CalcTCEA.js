import React, { useState } from "react";
import CalcFacturas from "./CalcFacturas";
import CalcInicial from "./CalcInicial";
import CalcFinal from "./CalcFinal";
import DatosFactura from "./DatosFactura";

const CalcTCEA = ({ facturaSelected }) => {
  const [state, setState] = useState({
    diasAnio: "",
    plazo: "",
    tasa: "",
    tipoTasa: "",
    fechaDescuento: new Date(),
    motivoInicialTipo: "",
    motivoInicialMonto: "",
    motivoInicialValor: "",
    motivoFinalTipo: "",
    motivoFinalMonto: "",
    motivoFinalValor: "",
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
        <div className="col-12 col-md-6">
          <CalcFacturas
            state={state}
            handleChange={handleChange}
            setState={setState}
          />
        </div>
        <div className="col-12 col-md-6">
          <DatosFactura facturaSelected={facturaSelected} />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          {" "}
          <CalcInicial
            state={state}
            handleChange={handleChange}
            setState={setState}
          />
        </div>
        <div className="col col-md-6">
          <CalcFinal
            state={state}
            handleChange={handleChange}
            setState={setState}
          />
        </div>
      </div>
    </div>
  );
};

export default CalcTCEA;
