// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Agrega tu configuración de Firebase (copiada de la consola de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyBhRwzt1LgPxuJaPgVMbdHD1PnjuiYnIVc",
    authDomain: "kublik-everywear.firebaseapp.com",
    projectId: "kublik-everywear",
    storageBucket: "kublik-everywear.firebasestorage.app",
    messagingSenderId: "691433523794",
    appId: "1:691433523794:web:2f9a3048ff289bf4a0ad8b",
    measurementId: "G-W4VF8GGC6J"
  };

const app = initializeApp(firebaseConfig);

// Exporta la instancia de Firebase Auth y el proveedor de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);