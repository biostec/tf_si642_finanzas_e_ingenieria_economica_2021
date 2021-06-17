import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { useHistory } from "react-router-dom";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  const history = useHistory();
  return (
    <div>
      <Drawer
        anchor="bottom"
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              history.push("/home");
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              history.push("/registroFacturas");
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Registro de Facturas" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              history.push("/historialFacturas");
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Historial de Facturas" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              history.push("/carteraFacturas");
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Cartera de Facturas" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
