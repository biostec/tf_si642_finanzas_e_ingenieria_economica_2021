import React, { useState, useEffect } from "react";
import CalcFacturas from "./CalcFacturas";
import CalcInicial from "./CalcInicial";
import CalcFinal from "./CalcFinal";
import DatosFactura from "./DatosFactura";
import Button from "@material-ui/core/Button";
import { firestore } from "../../utils/firebase";
import differenceInDays from "date-fns/differenceInCalendarDays";

const CalcTCEA = ({ facturaSelected, open, setOpen }) => {
  const [cIniciales, setCIniciales] = useState(null);
  const [cFinales, setCFinales] = useState(null);
  const [tcea, setTcea] = useState(null);
  const [datosFactura, setDatosFactura] = useState(null);
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
        tcea: tcea,
      })
      .then(() => {
        console.log("Document successfully written!");
        setOpen(!open);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const toEfectiva = (tn, n, m) => {
    let tep;
    tep = ((1 + tn / m) ^ n) - 1;
    return tep;
  };

  const operar = () => {
    let desc,
      auxTE,
      td,
      vNeto,
      vReci = 0,
      vEntre = 0,
      arrCI = cIniciales,
      arrCF = cFinales,
      r = 0,
      tempTcea,
      tef,
      dias;

    if (state.tipoTasa === "nominal")
      // Pasar a tasa efectiva
      auxTE = toEfectiva(state.tasa, state.diasAnio, state.plazo);
    // De lo contrario, trabajar con la efectiva
    else {
      auxTE = state.tasa;
    }
    auxTE = auxTE / 100;
    console.log("dato TE: ", auxTE);

    dias = parseInt(
      differenceInDays(new Date(datosFactura.fechaPago), state.fechaDescuento)
    );
    console.log("dias", dias);

    tef = 1 + auxTE;
    tef = Math.pow(tef, dias / state.diasAnio);
    tef -= 1;
    console.log("Tasa efectiva: ", tef);

    td = tef / (1 + tef); // Tasa Descontada
    console.log("Tasa descontada", td);

    desc = datosFactura.monto * td; // Descuento
    console.log("descuento", desc);

    vNeto = datosFactura.monto - desc; // Valor Neto
    console.log("Valor Neto", vNeto);

    for (let i = 0; i < arrCI.length; i++) {
      // Valor Recibido
      vReci +=
        vReci +
        parseFloat(vNeto) -
        parseFloat(arrCI[i].motivoMonto) -
        parseFloat(datosFactura.retencion);
      console.log(vReci);
    }
    console.log("Valor recibido", vReci);

    console.log("valor nominal: ", datosFactura.monto);
    for (let i = 0; i < arrCF.length; i++) {
      // Valor Entregado
      vEntre +=
        vEntre +
        parseFloat(datosFactura.monto) +
        parseFloat(arrCF[i].motivoMonto) -
        parseFloat(datosFactura.retencion);
      console.log(vEntre);
    }
    console.log("Valor Entregado", vEntre);

    tempTcea = vEntre / vReci;
    tempTcea = Math.pow(tempTcea, state.diasAnio / dias) - 1;
    console.log(tempTcea);

    setTcea(tempTcea);
  };

  useEffect(() => {
    if (tcea !== null) handleCalcTCEA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tcea]);

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
          <DatosFactura
            facturaSelected={facturaSelected}
            datosFactura={datosFactura}
            setDatosFactura={setDatosFactura}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <CalcInicial
            state={state}
            handleChange={handleChange}
            setState={setState}
            facturaSelected={facturaSelected}
            cIniciales={cIniciales}
            setCIniciales={setCIniciales}
          />
        </div>
        <div className="col col-md-6">
          <CalcFinal
            state={state}
            handleChange={handleChange}
            setState={setState}
            facturaSelected={facturaSelected}
            cFinales={cFinales}
            setCFinales={setCFinales}
          />
        </div>
      </div>
      <div className="text-center mt-3">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={operar}
        >
          CALCULAR
        </Button>
      </div>
    </div>
  );
};

export default CalcTCEA;
