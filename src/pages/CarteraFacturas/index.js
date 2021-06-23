import React, { useState } from "react";
import ListaCFacturas from "../../components/CarteraFacturas/ListaCFacturas";
import ListaCarteras from "../../components/CarteraFacturas/ListaCarteras";

const CarteraFacturas = () => {
  const [modo, setModo] = useState("listar");

  return (
    <div className="container mt-4">
      {modo === "listar" && <ListaCarteras modo={modo} setModo={setModo} />}
      {modo === "crear" && <ListaCFacturas modo={modo} setModo={setModo} />}
    </div>
  );
};

export default CarteraFacturas;
