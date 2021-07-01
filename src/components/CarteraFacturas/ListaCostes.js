import React, { useEffect } from "react";
import { firestore } from "../../utils/firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const ListaCostes = ({
  carteraID,
  type,
  helper,
  setHelper,
  cCostos,
  setCCostos,
  carteraCalculated,
}) => {
  useEffect(() => {
    firestore
      .collection("carteras")
      .doc(carteraID)
      .collection("gastos")
      .where("tipo", "==", type)
      .get()
      .then((querySnapShot) => {
        console.log(querySnapShot);
        setCCostos(
          querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  }, [helper]);

  const handleDelete = (gastoId) => {
    console.log(gastoId);
    firestore
      .collection("carteras")
      .doc(carteraID)
      .collection("gastos")
      .doc(gastoId)
      .delete()
      .then(() => {
        setHelper(!helper);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        {cCostos &&
          cCostos.map((gasto) => (
            <ListItem key={gasto.id}>
              <ListItemText
                primary={gasto.motivoTipo}
                secondary={gasto.motivoMonto}
              />
              {!carteraCalculated && (
                <IconButton
                  onClick={() => {
                    handleDelete(gasto.id);
                  }}
                  aria-label="delete"
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <ListItemIcon></ListItemIcon>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ListaCostes;
