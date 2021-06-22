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

const ListaHFacturas = () => {
  const [contenedor, setContenedor] = useState(null);
  const [openDialog, setOpenDialog] = useState(true);
  const [facturaSelected, setFacturaSelected] = useState(null);

  useEffect(() => {
    firestore
      .collection("facturas")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((querySnapShot) => {
        setContenedor(
          querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  }, []);

  return (
    <div className="container mt-3">
      <h3 className="mb-3">Mis Facturas</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha de Emision</StyledTableCell>
              <StyledTableCell align="center">
                Nombre de la Empresa
              </StyledTableCell>
              <StyledTableCell align="center">Monto</StyledTableCell>
              <StyledTableCell align="center">Fecha de Pago</StyledTableCell>
              <StyledTableCell align="center">TCEA&nbsp;(%)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenedor &&
              contenedor.map((factura) => {
                console.log(factura);
                return (
                  <StyledTableRow key={factura.id}>
                    <StyledTableCell align="center">
                      {factura.fechaEmision.seconds}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {factura.razonSocial}
                    </StyledTableCell>
                    <StyledTableCell align="center">{`${
                      factura.coin === "pen" ? `S/` : `$`
                    }  ${factura.monto}`}</StyledTableCell>
                    <StyledTableCell align="center">
                      {factura.fechaPago.seconds}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {factura.tcea !== null ? (
                        <button
                          onClick={() => {
                            setFacturaSelected(factura.id);
                            setOpenDialog(true);
                          }}
                        >
                          Calcular TCEA
                        </button>
                      ) : (
                        <span>factura.tcea</span>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && facturaSelected !== null && (
        <Dialog
          open={openDialog}
          setOpen={setOpenDialog}
          category="HFacturas"
          facturaSelected={facturaSelected}
          setFacturaSelected={setFacturaSelected}
        />
      )}
    </div>
  );
};

export default ListaHFacturas;
