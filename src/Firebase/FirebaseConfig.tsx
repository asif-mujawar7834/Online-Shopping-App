// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxu_ySLdtTZA0EWLgIKfTuNL17lthZkxA",
  authDomain: "online-shopping-app-a1cd3.firebaseapp.com",
  projectId: "online-shopping-app-a1cd3",
  storageBucket: "online-shopping-app-a1cd3.appspot.com",
  messagingSenderId: "745781303724",
  appId: "1:745781303724:web:857f91af29983d127fc209",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
