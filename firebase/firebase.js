import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCWxTaRdcAY_8fX9oLEJ66TtrO-QaQVNO8",
  authDomain: "ensf-28780.firebaseapp.com",
  projectId: "ensf-28780",
  storageBucket: "ensf-28780.appspot.com",
  messagingSenderId: "353886759724",
  appId: "1:353886759724:web:9de858df9b4b202e515a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
