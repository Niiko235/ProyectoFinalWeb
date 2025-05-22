import { initializeApp } from "firebase/app";   // inicializa firabase
import { getAuth } from "firebase/auth";        // necesario para autenticar usuarios


//credenciales de la db
const firebaseConfig = {
  apiKey: "AIzaSyDvSxHRtAH209YXv3wpQ408zF91_mRWb04",
  authDomain: "proyectofinalweb-ae9c3.firebaseapp.com",
  projectId: "proyectofinalweb-ae9c3",
  storageBucket: "proyectofinalweb-ae9c3.firebasestorage.app",
  messagingSenderId: "902523077464",
  appId: "1:902523077464:web:43f1d694b1758eb703db2d"
};

// exportar la configuracion y el autenticador
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
