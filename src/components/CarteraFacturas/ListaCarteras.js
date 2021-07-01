import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../utils/firebase";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e3ae20",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const ListaCarteras = ({ modo, setModo }) => {
  const [contenedor, setContenedor] = useState(null);

  useEffect(() => {
    firestore
      .collection("carteras")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((result) => {
        setContenedor(
          result.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
  }, []);

  return (
    <div>
      <div className="row mb-3 m-0">
        <div className="col-12 col-md-8"></div>
        <div className="col-12 col-md-4">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setModo("crear")}
          >
            Crear Cartera
          </Button>
        </div>
      </div>
      <div>
        <h3>Historial</h3>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">
                Valor Total a Recibir
              </StyledTableCell>
              <StyledTableCell align="center">TCEA Cartera</StyledTableCell>
              <StyledTableCell align="center">IGV</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenedor &&
              contenedor.map((cartera, index) => {
                return (
                  <StyledTableRow key={cartera.id}>
                    <StyledTableCell align="center">
                      {cartera.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`S/${parseFloat(cartera.totalRecibido).toFixed(2)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${parseFloat(cartera.tcea * 100).toFixed(7)}%`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`S/${parseFloat(cartera.totalDescuento * 0.18)}`}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListaCarteras;
