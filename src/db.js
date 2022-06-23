import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyAlDHQwvrPW5lliC3YwnU9t3t82_5qvQ74",
    authDomain: "pwlfinal71190467.firebaseapp.com",
    projectId: "pwlfinal71190467",
    storageBucket: "pwlfinal71190467.appspot.com",
    messagingSenderId: "628489921818",
    appId: "1:628489921818:web:20970f7b8bdad7717c38a3",
    measurementId: "G-5WW844DXL2"
}

const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(app)
