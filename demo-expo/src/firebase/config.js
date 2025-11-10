import app from "firebase/app";
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCpIlQvgRlaY0nCEUBd6IjakVO6j693MjY",
  authDomain: "reactnative-grupo9.firebaseapp.com",
  projectId: "reactnative-grupo9",
  storageBucket: "reactnative-grupo9.firebasestorage.app",
  messagingSenderId: "999496409463",
  appId: "1:999496409463:web:627afafb42d2dc35f3c172"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();

export { firebase }
export default firebase