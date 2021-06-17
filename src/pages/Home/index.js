import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="row ">
      <div
        className="col-12 col-md-6 bg-warning align-self-center"
        style={{ height: "100vh" }}
      >
        Ultimos movimientos
      </div>
      <div
        className="col-12 col-md-6 bg-info align-self-center"
        style={{ height: "100vh" }}
      >
        <Link to="registroFacturas">Registrar Facturas</Link>
      </div>
    </div>
  );
};

export default Home;
