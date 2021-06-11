import React from 'react';

const InicioSesion = ({logeado, setLogeado}) => {
    return (
        <div className="mb-2">
            <h1>Bienvenido a Facturanding</h1>
            <button onClick={() => {setLogeado(!logeado)}}>Logearse</button>
        </div>
    );
}

export default InicioSesion;
