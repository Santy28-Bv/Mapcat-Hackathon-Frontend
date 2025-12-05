import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";

// Credenciales de tu proyecto 'pixsoft-bd-b5654'
const firebaseConfig = {
  apiKey: "AIzaSyC9Mt_RV6pMe_M493tCpHQR7yz4JoTALv4",
  authDomain: "pixsoft-bd-b5654.firebaseapp.com",
  projectId: "pixsoft-bd-b5654",
  storageBucket: "pixsoft-bd-b5654.firebasestorage.app",
  messagingSenderId: "333274285382",
  appId: "1:333274285382:web:56ee5dbe1b55a611829147",
  measurementId: "G-LZVS25NVJ1"
};

// Inicializar la aplicación
const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firestore
export const db = getFirestore(app);

// Opcional: Establecer el nivel de registro para depuración
setLogLevel('debug');