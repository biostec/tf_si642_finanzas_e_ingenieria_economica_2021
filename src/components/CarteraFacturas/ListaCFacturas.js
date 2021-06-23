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
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import differenceInDays from "date-fns/differenceInDays";

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

const ListaCFacturas = ({ modo, setModo }) => {
  const [contenedor, setContenedor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [arrFacturasSelected, setArrFacturasSelected] = useState([]);

  useEffect(() => {
    firestore
      .collection("facturas")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((querySnapShot) => {
        setContenedor(
          querySnapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            selected: false,
          }))
        );
      });
  }, []);

  const updateChecbox = (index) => (e) => {
    let newArray = [...contenedor];
    newArray[index].selected = e.target.checked;
    setContenedor(newArray);
  };

  const handleExportFacturas = () => {
    let newArray = [];
    contenedor.forEach((factura, index) => {
      if (factura.selected) newArray.push(factura.id);
    });
    setArrFacturasSelected([...arrFacturasSelected, newArray]);
    setOpenDialog(!openDialog);
  };

  return (
    <div className="container mt-4">
      <div className="col-3">
        <IconButton
          aria-label="volver"
          onClick={() => {
            setModo("listar");
          }}
        >
          <ArrowBackIcon fontSize="large" />
          Volver
        </IconButton>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-8">
          <h4>Empieza a crear tu cartera de Facturas</h4>
          <h6>Selecciona tus facturas</h6>
        </div>
        <div className="col-12 col-md-4">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleExportFacturas}
          >
            CALCULA TU CARTERA
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                Nombre de la Empresa
              </StyledTableCell>
              <StyledTableCell align="center">Monto</StyledTableCell>
              <StyledTableCell align="center">Créditos</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenedor &&
              contenedor.map((factura, index) => {
                return (
                  <StyledTableRow key={factura.id}>
                    <StyledTableCell align="center">
                      {factura.razonSocial}
                    </StyledTableCell>
                    <StyledTableCell align="center">{`${
                      factura.coin === "pen" ? `S/` : `$`
                    }  ${factura.monto}`}</StyledTableCell>
                    <StyledTableCell align="center">
                      {differenceInDays(
                        new Date(factura.fechaPago),
                        new Date(factura.fechaEmision)
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Checkbox
                        checked={factura.selected}
                        onChange={updateChecbox(index)}
                        name="selectedCheckBox"
                        inputProps={{ "aria-label": "checkbox" }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && arrFacturasSelected !== [] && (
        <Dialog
          open={openDialog}
          setOpen={setOpenDialog}
          category="CFacturas"
          arrFacturasSelected={arrFacturasSelected}
          setArrFacturasSelected={setArrFacturasSelected}
        />
      )}
    </div>
  );
};

export default ListaCFacturas;
