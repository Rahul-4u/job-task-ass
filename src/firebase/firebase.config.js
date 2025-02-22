// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAavCdaPSiSnSr9VfMBv9uEYc9hZz7O89k",
  authDomain: "to-do-task-cb5f0.firebaseapp.com",
  projectId: "to-do-task-cb5f0",
  storageBucket: "to-do-task-cb5f0.firebasestorage.app",
  messagingSenderId: "726506156522",
  appId: "1:726506156522:web:6fbe03db58ea6d951c4293",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
