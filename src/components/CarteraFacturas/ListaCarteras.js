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
import Dialog from "../Globales/Dialog";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import differenceInDays from "date-fns/differenceInDays";
import FormHelperText from "@material-ui/core/FormHelperText";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
      <div>
        <h3>Lista Cartera de Facturas</h3>
      </div>
      <div className="row mb-3 m-0">
        <div className="col-12 col-md-8"></div>
        <div className="col-12 col-md-4">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setModo("crear")}
          >
            Añadir Cartera
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">N°</StyledTableCell>
              <StyledTableCell align="center">Fecha Emisión</StyledTableCell>
              <StyledTableCell align="center">Val. Nom.</StyledTableCell>
              <StyledTableCell align="center">Fecha Venc.</StyledTableCell>
              <StyledTableCell align="center">Días</StyledTableCell>
              <StyledTableCell align="center">Retención</StyledTableCell>
              <StyledTableCell align="center">TE%</StyledTableCell>
              <StyledTableCell align="center">d%</StyledTableCell>
              <StyledTableCell align="center">Descuento</StyledTableCell>
              <StyledTableCell align="center">Costo Ini.</StyledTableCell>
              <StyledTableCell align="center">Costo Fin.</StyledTableCell>
              <StyledTableCell align="center">Val. Neto</StyledTableCell>
              <StyledTableCell align="center">Val. Rec.</StyledTableCell>
              <StyledTableCell align="center">Val. Ent.</StyledTableCell>
              <StyledTableCell align="center">TCEA</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenedor &&
              contenedor.map((cartera, index) => {
                return (
                  <StyledTableRow key={cartera.id}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
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
