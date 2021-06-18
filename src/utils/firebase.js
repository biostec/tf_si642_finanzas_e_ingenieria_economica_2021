import config from "./configFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(config);

export const auth = firebase.auth();

const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);
export const firestore = firebase.firestore();
