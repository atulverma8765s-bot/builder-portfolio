import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe0k4NaPYozeI8-yH0s9Ns3m6CpnWGpJ0",
  authDomain: "foliocraft-cfd51.firebaseapp.com",
  projectId: "foliocraft-cfd51",
  storageBucket: "foliocraft-cfd51.firebasestorage.app",
  messagingSenderId: "778128481843",
  appId: "1:778128481843:web:507cf6e6d7ca712a5a8d46",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
