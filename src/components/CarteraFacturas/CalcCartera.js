import React, { useState } from "react";

const CalcCartera = ({ arrFacturasSelected, open, setOpen }) => {
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
  return (
    <div className="row">
      {/* <div className="col"></div>
       <div className="col"></div>
     </div> */}
      {/* // <div className="container">
    //   <div className="row mt-4">
    //     <div className="col-12 col-md-6">
    //       <CalcFacturas
    //         state={state}
    //         handleChange={handleChange}
    //         setState={setState}
    //       />
    //     </div>
    //     <div className="col-12 col-md-6">
    //       <DatosFactura facturaSelected={facturaSelected} />
    //     </div>
    //   </div>

    //   <div className="row">
    //     <div className="col-12 col-md-6">
    //       <CalcInicial
    //         state={state}
    //         handleChange={handleChange}
    //         setState={setState}
    //         facturaSelected={facturaSelected}
    //       />
    //     </div>
    //     <div className="col col-md-6">
    //       <CalcFinal
    //         state={state}
    //         handleChange={handleChange}
    //         setState={setState}
    //         facturaSelected={facturaSelected}
    //       />
    //     </div>
    //   </div>
    //   <div className="text-center mt-3">
    //     <Button
    //       variant="contained"
    //       size="large"
    //       color="primary"
    //       onClick={handleCalcTCEA}
    //     >
    //       CALCULAR
    //     </Button>
    //   </div> */}
    </div>
  );
};

export default CalcCartera;
