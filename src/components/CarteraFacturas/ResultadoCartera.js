import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

const ResultadoCartera = ({ state }) => {
  return (
    <div className="mb-4">
      <h3>Resultados</h3>
      <div className="row mt-4">
        <div className="col-2"></div>
        <div className="col-8">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Valor Total a Recibir
                  </StyledTableCell>
                  <StyledTableCell align="center">TCEA Cartera</StyledTableCell>
                  <StyledTableCell align="center">IGV</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center">
                    {`S/${state.totalRecibido}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`${parseFloat(state.tcea * 100).toFixed(7)}%`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`S/${parseFloat(state.totalDescuento * 0.18)}`}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default ResultadoCartera;
