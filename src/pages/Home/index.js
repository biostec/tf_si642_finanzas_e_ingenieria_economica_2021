import React from "react";
import InfoBasica from "../../components/Home/InfoBasica";
import calculadora from "../../utils/calc.jpg";
import Noticias from "../../components/Home/Noticias";

const Image = () => {
  return (
    <div className="col-12 col-md-6 align-self-center">
      <div className="container h-100">
        <div className=" my-5 px-5 py-5  h-50">
          <div className="mt-5">
            <img src={calculadora} alt="calculadora" className="mw-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <InfoBasica />
        <Image />
      </div>
      <Noticias />
    </div>
  );
};

export default Home;
