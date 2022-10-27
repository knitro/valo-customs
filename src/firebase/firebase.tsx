import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

////////////////////////////////////////////////////////
// Initialisation
////////////////////////////////////////////////////////

export const firebaseConfig = {
  apiKey: "AIzaSyA9CIrjr_jZ4b9l3J7wIUox8r_yeAE-_98",
  authDomain: "valorant-map-picker.firebaseapp.com",
  projectId: "valorant-map-picker",
  storageBucket: "valorant-map-picker.appspot.com",
  messagingSenderId: "200165159456",
  appId: "1:200165159456:web:7a17173149ca0ef076c245",
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
