// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-ORsZrwSnhuLuaU7DhBQ3uq6WbNQp8lM",
  authDomain: "mindxcijuly22.firebaseapp.com",
  projectId: "mindxcijuly22",
  storageBucket: "mindxcijuly22.appspot.com",
  messagingSenderId: "5649304631",
  appId: "1:5649304631:web:18ead401b8c53b0df103b2",
  measurementId: "G-56D3R093T8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
