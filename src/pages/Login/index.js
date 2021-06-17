import React, { useState } from "react";
import InicioSesion from "../../components/Login/InicioSesion";
import Registro from "../../components/Login/Registro";

const Login = ({ logeado, setLogeado }) => {
  const [register, setRegister] = useState(false);
  return (
    <div>
      {register ? (
        <Registro register={register} setRegister={setRegister} />
      ) : (
        <InicioSesion
          logeado={logeado}
          setLogeado={setLogeado}
          register={register}
          setRegister={setRegister}
        />
      )}
    </div>
  );
};

export default Login;
