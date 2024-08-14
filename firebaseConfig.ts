import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7TGWOjDVjkrFZSVe5T3U3khmf5IJnC3w",
  authDomain: "pia-etapa3.firebaseapp.com",
  projectId: "pia-etapa3",
  storageBucket: "pia-etapa3.appspot.com",
  messagingSenderId: "685937240250",
  appId: "1:685937240250:web:dfe94a5cda4bac0fc77a83",
  measurementId: "G-6T6EGQB5NQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Analytics (opcional)
export const analytics = getAnalytics(app);
