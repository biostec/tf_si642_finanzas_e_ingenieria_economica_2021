import React, { useState } from "react";
import CalcFacturas from "./CalcFacturas";
import CalcInicial from "./CalcInicial";
import CalcFinal from "./CalcFinal";
import DatosFactura from "./DatosFactura";
import Button from "@material-ui/core/Button";
import { firestore } from "../../utils/firebase";

const CalcTCEA = ({ facturaSelected, open, setOpen }) => {
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

  const handleCalcTCEA = () => {
    firestore
      .collection("facturas")
      .doc(facturaSelected)
      .update({
        tcea: "Hacer aquí operación TCEA",
      })
      .then(() => {
        console.log("Document successfully written!");
        setOpen(!open);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
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
          <CalcInicial
            state={state}
            handleChange={handleChange}
            setState={setState}
            facturaSelected={facturaSelected}
          />
        </div>
        <div className="col col-md-6">
          <CalcFinal
            state={state}
            handleChange={handleChange}
            setState={setState}
            facturaSelected={facturaSelected}
          />
        </div>
      </div>
      <div className="text-center mt-3">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleCalcTCEA}
        >
          CALCULAR
        </Button>
      </div>
    </div>
  );
};

export default CalcTCEA;
