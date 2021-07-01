import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { AuthContext } from "./../../utils/Auth";
import MobileMenu from "./MobileMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  Perfil: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Header() {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = () => {
    handleClose();
    auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {currentUser && (
            <IconButton
              edge="start"
              className="d-sm-none"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!currentUser ? (
            <Typography variant="h5">Facturanding</Typography>
          ) : (
            <React.Fragment>
              <Typography
                variant="p"
                className="d-none d-sm-block flex-grow-1"
                onClick={() => history.push("/home")}
                style={{ cursor: "pointer" }}
              >
                Inicio
              </Typography>

              <Typography
                variant="p"
                className="d-none d-sm-block flex-grow-1"
                onClick={() => history.push("/registroFacturas")}
                style={{ cursor: "pointer" }}
              >
                Registro de Facturas
              </Typography>

              <Typography
                variant="p"
                className="d-none d-sm-block flex-grow-1"
                onClick={() => history.push("/historialFacturas")}
                style={{ cursor: "pointer" }}
              >
                TCEA Factura
              </Typography>

              <Typography
                variant="p"
                className="d-none d-sm-block flex-grow-1"
                onClick={() => history.push("/carteraFacturas")}
                style={{ cursor: "pointer" }}
              >
                Cartera de Facturas
              </Typography>

              <div
                style={{ position: "absolute", right: "0px", padding: "10px" }}
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to={`/perfil`}>
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
                <MenuItem onClick={handleChange}>Cerrar Sesion</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>

      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
