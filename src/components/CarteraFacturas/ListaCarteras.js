import React from "react";
import Button from "@material-ui/core/Button";

const ListaCarteras = ({ modo, setModo }) => {
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => setModo("crear")}
      >
        Añadir Cartera
      </Button>
    </div>
  );
};

export default ListaCarteras;
