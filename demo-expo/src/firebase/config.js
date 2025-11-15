import app from "firebase/app"; // importa el módulo de Firebase como app
import firebase from 'firebase' // importa firebase

const firebaseConfig = { // todos estos son datros que me da firebase cuando creo el proyecto
  apiKey: "AIzaSyCpIlQvgRlaY0nCEUBd6IjakVO6j693MjY",  
  authDomain: "reactnative-grupo9.firebaseapp.com",
  projectId: "reactnative-grupo9",
  storageBucket: "reactnative-grupo9.firebasestorage.app",
  messagingSenderId: "999496409463",
  appId: "1:999496409463:web:627afafb42d2dc35f3c172"
};

firebase.initializeApp(firebaseConfig); // inicializa la app de firebase con la configuración

export const auth = firebase.auth();
export const db = app.firestore();

export { firebase } // exporta firebase para usar sus servicios en otras partes de la app
export default firebase 