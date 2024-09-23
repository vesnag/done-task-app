import { GoogleAuthProvider, getAuth } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Qj3cAEGje2YXC0yWWAOLvyIbOWa_CHw",
  authDomain: "donetask-f64fe.firebaseapp.com",
  projectId: "donetask-f64fe",
  storageBucket: "donetask-f64fe.appspot.com",
  messagingSenderId: "324330895675",
  appId: "1:324330895675:web:c978d7d795ead056205f1e",
  measurementId: "G-GT166Y7WD3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
