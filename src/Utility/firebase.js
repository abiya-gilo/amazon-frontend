// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiGumeKhxecv8yO0RcNHBFa8Xi0U4g-gE",
  authDomain: "clone-6181a.firebaseapp.com",
  projectId: "clone-6181a",
  storageBucket: "clone-6181a.appspot.com", // corrected domain
//   storageBucket: "clone-6181a.firebasestorage.app",
  messagingSenderId: "356442919180",
  appId: "1:356442919180:web:f69be9453c659370f7b929",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
