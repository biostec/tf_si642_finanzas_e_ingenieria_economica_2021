import React, { useEffect, useState } from "react";
import { firestore } from "../../utils/firebase";
import TextField from "@material-ui/core/TextField";

const DatosFactura = ({ facturaSelected, datosFactura, setDatosFactura }) => {
  useEffect(() => {
    firestore
      .collection("facturas")
      .doc(facturaSelected)
      .get()
      .then((querySnapShot) => {
        console.log(querySnapShot.data());
        setDatosFactura(querySnapShot.data());
      });
  }, [facturaSelected]);
  return (
    <div>
      <h3 className="mb-3 mt-3 mt-md-0">Datos de la Factura</h3>
      {/*Fecha de Emisión */}
      <TextField
        variant="outlined"
        margin="normal"
        disabled
        fullWidth
        id="fechaEmision"
        label="Fecha de Emision"
        value={
          datosFactura !== null && datosFactura.fechaEmision
            ? `${new Date(datosFactura.fechaEmision).getDate()}/${new Date(
                datosFactura.fechaEmision
              ).getMonth()}/${new Date(
                datosFactura.fechaEmision
              ).getFullYear()}`
            : ``
        }
        name="fechaEmision"
      />

      {/*Fecha de Pago */}
      <TextField
        variant="outlined"
        margin="normal"
        disabled
        fullWidth
        id="fechaPago"
        label="Fecha de Pago"
        value={
          datosFactura !== null && datosFactura.fechaPago !== null
            ? `${new Date(datosFactura.fechaPago).getDate()}/${new Date(
                datosFactura.fechaPago
              ).getMonth()}/${new Date(datosFactura.fechaPago).getFullYear()}`
            : ``
        }
        name="fechaPago"
      />

      {/*Total Facturado*/}
      <TextField
        variant="outlined"
        margin="normal"
        disabled
        fullWidth
        id="monto"
        label="Monto"
        value={
          datosFactura !== null && datosFactura.monto != null
            ? `${datosFactura.monto}`
            : ``
        }
        name="monto"
      />

      {/*Total Facturado*/}
      <TextField
        variant="outlined"
        margin="normal"
        disabled
        fullWidth
        id="retencion"
        label="Retencion"
        value={
          datosFactura !== null && datosFactura.retencion !== null ? `0` : ``
        }
        name="Retencion"
      />
    </div>
  );
};

export default DatosFactura;
