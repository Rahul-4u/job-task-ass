// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD-wmcl8VcLm7jrTYmJPv__p04lRf0_HF0",
//   authDomain: "b10-a12-fbcff.firebaseapp.com",
//   projectId: "b10-a12-fbcff",
//   storageBucket: "b10-a12-fbcff.firebasestorage.app",
//   messagingSenderId: "1079902330981",
//   appId: "1:1079902330981:web:3d66f4b9b50eb61493e68c",
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
