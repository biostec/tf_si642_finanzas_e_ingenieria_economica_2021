import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import differenceInDays from "date-fns/differenceInDays";
import ResultadoCartera from "./ResultadoCartera";

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

const MostrarTCEA = ({ facturas, cartera, state }) => {
  return (
    <div class="container">
      <div className="mb-2">
        <ResultadoCartera state={state} />
      </div>
      <div className="mb-5">
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
                <StyledTableCell align="center">TCEA %</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((factura, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${new Date(factura.fechaEmision).getDate()}/${new Date(
                        factura.fechaEmision
                      ).getMonth()}/${new Date(
                        factura.fechaEmision
                      ).getFullYear()} `}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${factura.coin === "pen" ? `S/` : `$`}  ${
                        factura.monto
                      }`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${new Date(factura.fechaPago).getDate()}/${new Date(
                        factura.fechaPago
                      ).getMonth()}/${new Date(
                        factura.fechaPago
                      ).getFullYear()} `}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {parseInt(
                        differenceInDays(
                          new Date(factura.fechaPago),
                          state.fechaDescuento
                        )
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {factura.r}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {parseFloat(factura.TEfectivaPorc * 100).toFixed(7)}%
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {parseFloat(factura.tasaDesc * 100).toFixed(7)}%
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${
                        factura.coin === "pen" ? `S/` : `$`
                      } ${factura.descuento.toFixed(3)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${
                        factura.coin === "pen" ? `S/` : `$`
                      } ${factura.arrCI.toFixed(2)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${
                        factura.coin === "pen" ? `S/` : `$`
                      } ${factura.arrCF.toFixed(2)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${
                        factura.coin === "pen" ? `S/` : `$`
                      } ${factura.valorNeto.toFixed(2)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${
                        factura.coin === "pen" ? `S/` : `$`
                      } ${factura.valorRecibido.toFixed(2)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${
                        factura.coin === "pen" ? `S/` : `$`
                      } ${factura.valorEntregado.toFixed(2)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {parseFloat(factura.tcea * 100).toFixed(7)}%
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MostrarTCEA;
