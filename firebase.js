 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import { getFirestore, doc, setDoc, addDoc, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBkAcfJmQBOWh-VpdPWvGvbg7wbQjwpJiM",
   authDomain: "blog-app-e71f3.firebaseapp.com",
   projectId: "blog-app-e71f3",
   storageBucket: "blog-app-e71f3.firebasestorage.app",
   messagingSenderId: "476581735246",
   appId: "1:476581735246:web:c040f799d6fb54e203cc1f"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export{
    app,
    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    updateDoc,
    deleteField,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
}