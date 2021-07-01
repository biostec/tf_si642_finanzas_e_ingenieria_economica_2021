import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../utils/firebase";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { useHistory } from "react-router-dom";

const InfoBasica = () => {
  const [dataUser, setDataUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    firestore
      .collection("profiles")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((result) => {
        result.docs.forEach((doc) => {
          setDataUser(doc.data());
        });
      });
  }, []);

  const handleClick = () => {
    history.push("/registroFacturas");
  };

  return (
    <div className="col-12 col-md-6 align-self-center">
      <div className="container  h-100">
        <div className=" my-5 px-5 py-5 bg-secondary h-50">
          <div>
            <p className="h5">Bienvenido a Facturanding,</p>
            {dataUser !== null && (
              <h3 className="text-capitalize">{dataUser.nombre}!</h3>
            )}
          </div>
          <div className="mt-4">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick}
              startIcon={<AddCircleOutlineIcon />}
            >
              Crear factura
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBasica;
