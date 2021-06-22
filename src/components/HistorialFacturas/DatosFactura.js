import React, { useEffect, useState } from "react";
import { firestore } from "../../utils/firebase";
import TextField from "@material-ui/core/TextField";

const DatosFactura = ({ facturaSelected }) => {
  const [contenedor, setContenedor] = useState(null);

  useEffect(() => {
    firestore
      .collection("facturas")
      .doc(facturaSelected)
      .get()
      .then((querySnapShot) => {
        console.log(querySnapShot.data());
        setContenedor(querySnapShot.data());
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
          contenedor !== null && contenedor.fechaEmision.seconds
            ? `${contenedor.fechaEmision.seconds}`
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
          contenedor !== null && contenedor.fechaPago.seconds !== null
            ? `${contenedor.fechaPago.seconds}`
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
          contenedor !== null && contenedor.monto != null
            ? `${contenedor.monto}`
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
          contenedor !== null && contenedor.retencion !== null
            ? `${contenedor.retencion}`
            : ``
        }
        name="Retencion"
      />
    </div>
  );
};

export default DatosFactura;
