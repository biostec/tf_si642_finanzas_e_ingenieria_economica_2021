import React from 'react'
import InicioSesion from "../../components/Login/InicioSesion"
import Registro from "../../components/Login/Registro"

const index = ({logeado, setLogeado}) => {
    return (
        <div>
            <InicioSesion  logeado={logeado} setLogeado={setLogeado}  />
            <Registro />            
        </div>
    );
}

export default index;
