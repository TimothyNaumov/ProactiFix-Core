// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdb4ZPRwqHUmhiP-4EqiXKdQ9pZPfe7x4",
  authDomain: "node-server-data.firebaseapp.com",
  databaseURL: "https://node-server-data-default-rtdb.firebaseio.com",
  projectId: "node-server-data",
  storageBucket: "node-server-data.appspot.com",
  messagingSenderId: "1088832821315",
  appId: "1:1088832821315:web:692baab80f7bc05d9e5cf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);