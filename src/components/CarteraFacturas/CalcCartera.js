import React, { useState, useEffect } from "react";
import CalcTasa from "./CalcTasa";
import CalcInicial from "./CalcInicial";
import CalcFinal from "./CalcFinal";
import { firestore } from "../../utils/firebase";
import Button from "@material-ui/core/Button";

const CalcCartera = ({ carteraID, open, setOpen }) => {
  const [cartera, setCartera] = useState(null);
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

  //Leer CarterauseEffect(() => {
  useEffect(() => {
    firestore
      .collection("carteras")
      .doc(carteraID)
      .get()
      .then((querySnapShot) => {
        setCartera(querySnapShot.data());
      });
  }, []);

  //Actualizar Cartera
  const update_cartera = () => {
    firestore
      .collection("carteras")
      .doc(carteraID)
      .update({
        tcea: "Insertar el resultado de la operación",
        diasAnio: state.diasAnio,
        plazo: state.plazo,
        tasa: state.tasa,
        tipoTasa: state.tipoTasa,
        fechaDescuento: state.fechaDescuento,
        motivoInicialTipo: state.motivoInicialTipo,
        motivoInicialMonto: state.motivoInicialMonto,
        motivoInicialValor: state.motivoInicialValor,
        motivoFinalTipo: state.motivoFinalTipo,
        motivoFinalMonto: state.motivoFinalMonto,
        motivoFinalValor: state.motivoFinalValor,
      })
      .then(() => {
        console.log("Document successfully written!");
        setOpen(!open);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  //Manejador del estado
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-md-6">
          <CalcTasa
            state={state}
            handleChange={handleChange}
            setState={setState}
          />
        </div>
        <div className="col-12 col-md-6">
          <CalcInicial
            state={state}
            handleChange={handleChange}
            setState={setState}
            carteraID={carteraID}
          />
          <CalcFinal
            state={state}
            handleChange={handleChange}
            setState={setState}
            carteraID={carteraID}
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={update_cartera}
        >
          CALCULAR
        </Button>
      </div>
    </div>
  );
};

export default CalcCartera;
