import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CalcTCEA from "../HistorialFacturas/CalcTCEA";
import CalcCartera from "../CarteraFacturas/CalcCartera";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  category,
  facturaSelected,
  setFacturaSelected,
  carteraID,
  setArrFacturasSelected,
  helper,
  setHelper,
}) {
  const classes = useStyles();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    if (category === "HFacturas") setFacturaSelected(false);
    else if (category === "CFacturas") {
      setHelper(!helper);
      setArrFacturasSelected([]);
    }
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {category === "HFacturas"
                ? "CalcularTCEA"
                : "Calcular Cartera de Facturas"}
            </Typography>
          </Toolbar>
        </AppBar>
        {category === "HFacturas" ? (
          <CalcTCEA
            facturaSelected={facturaSelected}
            open={open}
            setOpen={setOpen}
          />
        ) : (
          <>
            {category === "CFacturas" && (
              <CalcCartera
                carteraID={carteraID}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )}
      </Dialog>
    </div>
  );
}
