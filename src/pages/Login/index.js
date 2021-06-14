import React from 'react'
import InicioSesion from "../../components/Login/InicioSesion"
const index = ({logeado, setLogeado}) => {
    return (
        <div >
            <InicioSesion  logeado={logeado} setLogeado={setLogeado}  />
        </div>
    );
}

export default index;
