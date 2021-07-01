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
import FormHelperText from "@material-ui/core/FormHelperText";

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

const ListaCFacturas = ({ modo, setModo }) => {
  const [contenedor, setContenedor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [arrFacturasSelected, setArrFacturasSelected] = useState([]);
  const [carteraID, setCarteraID] = useState(null);
  const [helper, setHelper] = useState(false);

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
  }, [helper]);

  const CrearCartera = () => {
    firestore
      .collection("carteras")
      .add({
        uid: auth.currentUser.uid,
        facturas: arrFacturasSelected,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setCarteraID(docRef.id);
        setOpenDialog(!openDialog);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert(error);
      });
  };

  const updateCheckbox = (index) => (e) => {
    // Añadir / Eliminar selección en el arreglo original
    let newArray = [...contenedor];
    newArray[index].selected = e.target.checked;
    setContenedor(newArray);

    // Actualizar los elementos del arreglo de facturas seleccionadas
    let temp = [];
    for (let i = 0; i < contenedor.length; i++) {
      if (contenedor[i].selected) {
        temp.push(contenedor[i].id);
      }
    }
    setArrFacturasSelected(temp);
  };

  return (
    <div className="container mt-4">
      <div className="col-3 mb-3">
        <IconButton
          className="p-0"
          aria-label="volver"
          onClick={() => {
            setModo("listar");
          }}
        >
          <ArrowBackIcon fontSize="large" />
          Volver
        </IconButton>
      </div>
      <div>
        <h3>Cartera de Facturas</h3>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-8"></div>
        <div className="col-12 col-md-4">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={CrearCartera}
            disabled={arrFacturasSelected.length === 0}
          >
            CALCULA TU CARTERA
          </Button>
          {arrFacturasSelected.length === 0 && (
            <FormHelperText className="text-danger">
              *Selecciona tus facturas
            </FormHelperText>
          )}
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
              <StyledTableCell align="center">Días</StyledTableCell>
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
                        onChange={updateCheckbox(index)}
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
      {openDialog && arrFacturasSelected !== [] && carteraID !== null && (
        <Dialog
          open={openDialog}
          setOpen={setOpenDialog}
          category="CFacturas"
          carteraID={carteraID}
          setArrFacturasSelected={setArrFacturasSelected}
          helper={helper}
          setHelper={setHelper}
        />
      )}
    </div>
  );
};

export default ListaCFacturas;
