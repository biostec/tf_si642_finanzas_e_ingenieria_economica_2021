import React, { useState } from "react";
import { withRouter } from "react-router";
import { auth, firestore } from "../../utils/firebase";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as Yup from "yup";
import { useFormik } from "formik";
// import Avatar from "@material-ui/core/Avatar";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style.js";

const Registro = ({ history, register, setRegister }) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [ruc, setRuc] = useState("");
  // const [dni, setDni] = useState("");

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      lastName: "",
      birthday: "",
      ruc: "",
      dni: "",
    },
    onSubmit: (values) => {
      handleSignUp(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre obligatorio"),
      email: Yup.string()
        .email("Ingrese un email valido")
        .required("Email Obligatorio"),
      lastName: Yup.string().required("Apellido Obligatorio"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("Contraseña Obligatoria"),
      dni: Yup.string("Ingrese los Números de su DNI")
        .matches(/^[0-9]+$/, "Solo pueden ser numeros")
        .min(8, "Tienen que ser solo 8 dígitos")
        .max(8, "Tienen que ser solo 8 dígitos")
        .required("DNI Obligatorio"),
      ruc: Yup.string(),
      birthday: Yup.string().required("Obligatorio"),
    }),
  });
  // const [leyenda, setleyenda] = React.useState("");

  const handleSubmitt = async (values) => {
    firestore
      .collection("profiles")
      .add({
        uid: auth.currentUser.uid,
        nombre: values.name,
        apellido: values.lastName,
        ruc: values.ruc,
        fechaNacimiento: values.birthday,
        dni: values.dni,
      })
      .then((docRef) => {
        history.push("/home");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert(error);
      });
  };

  const handleSignUp = async (event, values) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(
        values.email.trim(),
        values.password
      );
      handleSubmitt(values);
    } catch (error) {
      console.log(values.email);
      alert(error);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            // {...formik.getFieldProps("name")}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />

          {formik.touched.name && formik.errors.name ? (
            <FormHelperText style={{ color: "red" }} id="name-error">
              {formik.errors.name}
            </FormHelperText>
          ) : null}

          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            autoComplete="lastName"
            autoFocus
            size="small"
            value={formik.values.lastName}
            onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          />

          {formik.touched.lastName && Boolean(formik.errors.lastName) ? (
            <FormHelperText style={{ color: "red" }} id="lastName-error">
              {formik.errors.lastName}
            </FormHelperText>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
            error={formik.touched.email && Boolean(formik.errors.email)}
            // helperText={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormHelperText style={{ color: "red" }} id="email-error">
              {formik.errors.email}
            </FormHelperText>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="ruc"
            label="RUC (Opcional)"
            name="ruc"
            autoComplete="ruc"
            autoFocus
            value={formik.values.ruc}
            onChange={(e) => formik.setFieldValue("ruc", e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="dni"
            label="DNI"
            name="dni"
            autoComplete="dni"
            autoFocus
            value={formik.values.dni}
            onChange={(e) => formik.setFieldValue("dni", e.target.value)}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
          />
          {formik.touched.dni && formik.errors.dni ? (
            <FormHelperText style={{ color: "red" }} id="dni-error">
              {formik.errors.dni}
            </FormHelperText>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            label="Fecha de Nacimiento"
            type="date"
            defaultValue="2017-05-24"
            id="birthday"
            name="birthday"
            autoComplete="birthday"
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.birthday}
            onChange={(e) => formik.setFieldValue("birthday", e.target.value)}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
          />
          {formik.touched.birthday && formik.errors.birthday ? (
            <FormHelperText style={{ color: "red" }} id="birthday-error">
              {formik.errors.birthday}
            </FormHelperText>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={(e) => formik.setFieldValue("password", e.target.value)}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormHelperText style={{ color: "red" }} id="password-error">
              {formik.errors.password}
            </FormHelperText>
          ) : null}
          <Button
            type="submit"
            fullWidth
            id="button"
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleSignUp}
          >
            Confirmar
          </Button>
        </form>
        <Grid item>
          <Link href="#" variant="body2" onClick={() => setRegister(!register)}>
            {"Ya tengo una cuenta!"}
          </Link>
        </Grid>
      </div>
    </Grid>
  );
};

export default withRouter(Registro);
