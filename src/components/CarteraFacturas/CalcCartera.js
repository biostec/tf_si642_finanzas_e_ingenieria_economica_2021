import React, { useState, useEffect } from "react";
import CalcTasa from "./CalcTasa";
import CalcInicial from "./CalcInicial";
import CalcFinal from "./CalcFinal";
import MostrarTCEA from "./MostrarTCEA";
import { firestore } from "../../utils/firebase";
import Button from "@material-ui/core/Button";
import differenceInDays from "date-fns/differenceInCalendarDays";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CalcCartera = ({
  carteraID,
  open,
  setOpen,
  carteraCalculated,
  setCarteraCalculated,
}) => {
  const [cIniciales, setCIniciales] = useState(null);
  const [cFinales, setCFinales] = useState(null);
  const [facturas, setFacturas] = useState(null);
  const [detalleFacturas, setDetalleFacturas] = useState(null);
  const [cartera, setCartera] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [nameCartera, setNameCartera] = useState("");
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
    tcea: "",
    totalRecibido: "",
    totalDescuento: "",
    calculado: true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Actualizar Cartera
  const update_cartera = (tcea, totalRecibido, totalDescuento) => {
    firestore
      .collection("carteras")
      .doc(carteraID)
      .update({
        tcea,
        totalRecibido,
        totalDescuento,
        nombre: nameCartera,
        // diasAnio: state.diasAnio,
        // plazo: state.plazo,
        // tasa: state.tasa,
        // tipoTasa: state.tipoTasa,
        // fechaDescuento: state.fechaDescuento,
        // motivoInicialTipo: state.motivoInicialTipo,
        // motivoInicialMonto: state.motivoInicialMonto,
        // motivoInicialValor: state.motivoInicialValor,
        // motivoFinalTipo: state.motivoFinalTipo,
        // motivoFinalMonto: state.motivoFinalMonto,
        // motivoFinalValor: state.motivoFinalValor,
      })
      .then(() => {
        console.log("Document successfully written!");
        //setOpen(!open);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  // Trae las facturas
  useEffect(() => {
    if (cartera !== null) {
      let auxCart = cartera;
      let facturaI = [];
      let auxFDesplegada = [];

      for (let i = 0; i < auxCart.facturas.length; i++)
        facturaI.push(auxCart.facturas[i]);

      for (let i = 0; i < facturaI.length; i++) {
        firestore
          .collection("facturas")
          .doc(facturaI[i])
          .get()
          .then((result) => {
            auxFDesplegada.push(result.data());
          });
      }
      setFacturas(auxFDesplegada);
    }
  }, [cartera]);

  //Manejador del estado
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //Convierte de tasa Nominal a Tasa Efectiva
  const toEfectiva = (tn, n, m) => {
    let tep;
    tep = ((1 + tn / m) ^ n) - 1;
    return tep;
  };

  //Halla la TCEA de una factura
  const operar = (datosFactura) => {
    console.log(datosFactura);
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

    let obj = {
      descuento: desc,
      tasaDesc: td,
      valorNeto: vNeto,
      valorRecibido: vReci,
      valorEntregado: vEntre,
      arrCI: vReci - vNeto,
      arrCF: vEntre - datosFactura.monto,
      r: datosFactura.retencion,
      tcea: tempTcea,
      TEfectivaPorc: tef,
      dias,
    };
    console.log(tempTcea);
    return obj;
  };

  // Hallar TCEA de una cartera
  const calcTCEA_Factura = () => {
    if (facturas !== null) {
      let newArray = [];
      for (let i = 0; i < facturas.length; i++)
        newArray.push({ ...operar(facturas[i]), ...facturas[i] });

      setDetalleFacturas(newArray);
      binomial(newArray);
    }
  };

  // Hallar TCEA
  const binomial = (facturas) => {
    let F = 1,
      a = 0,
      b = (2 * F) / 360,
      tir_p = 0,
      tcea = 0,
      tir_a = 0,
      cont = -1,
      sumVR = 0,
      sumDesc = 0;

    for (let i = 0; i < facturas.length; i++) {
      sumVR += parseInt(facturas[i].valorRecibido);
      sumDesc += parseInt(facturas[i].descuento);
    }

    while (cont < 0) {
      let valc = 0,
        c = (a + b) / 2;

      for (let i = 0; i < facturas.length; i++) {
        let aux = Math.pow(1 + c, facturas[i].dias);
        valc += facturas[i].valorEntregado / aux;
      }

      if (valc < sumVR) b = c;
      else a = c;

      if (Math.abs(valc - sumVR) < 0.00001) {
        tir_p = c;
        tir_a = (tir_p * 360) / F;
        tcea =
          parseFloat(Math.pow(1 + tir_a * (F / 360), 360 / F)) - parseFloat(1);
        cont += 1;
      }
      console.log("aqui sigo");
    }
    console.log(tir_p);
    console.log(tir_a);
    console.log("TCEA: " + parseFloat(tcea * 100).toFixed(7) + "%");

    setState({
      ...state,
      tcea,
      totalRecibido: sumVR,
      totalDescuento: sumDesc,
    });

    update_cartera(tcea, sumVR, sumDesc);
  };

  return (
    <div className="container">
      <div className="row mb-">
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-md-6">
          <CalcTasa
            state={state}
            handleChange={handleChange}
            setState={setState}
            carteraCalculated={carteraCalculated}
          />
        </div>
        <div className="col-12 col-md-6">
          <CalcInicial
            state={state}
            handleChange={handleChange}
            setState={setState}
            carteraID={carteraID}
            cIniciales={cIniciales}
            setCIniciales={setCIniciales}
            carteraCalculated={carteraCalculated}
          />
          <CalcFinal
            state={state}
            handleChange={handleChange}
            setState={setState}
            carteraID={carteraID}
            cFinales={cFinales}
            setCFinales={setCFinales}
            carteraCalculated={carteraCalculated}
          />
        </div>
      </div>
      <div className="text-center my-4">
        <Button
          variant="contained"
          size="large"
          color="primary"
          disabled={carteraCalculated}
          onClick={() => {
            setOpenForm(!openForm);
          }}
        >
          CALCULAR
        </Button>
      </div>
      <div>
        {state.calculado && facturas && detalleFacturas && (
          <MostrarTCEA
            //facturas={facturas}
            cartera={cartera}
            state={state}
            facturas={detalleFacturas}
          />
        )}
      </div>
      <div>
        {openForm && (
          <Dialog
            open={open}
            onClose={() => setOpenForm(!openForm)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Vamos a Guardar tu Cartera
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Queremos ayudarte a que puedas revisar el cálculo de tu cartera
                de facturas en cualquier momento.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre de la Cartera"
                type="text"
                fullWidth
                onChange={(e) => {
                  setNameCartera(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenForm(!openForm)} color="primary">
                Cancel
              </Button>
              <Button
                disabled={nameCartera === ""}
                onClick={() => {
                  setOpenForm(!openForm);
                  setCarteraCalculated(true);
                  calcTCEA_Factura();
                }}
                color="primary"
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CalcCartera;
