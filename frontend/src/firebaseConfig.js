// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvNwEvEic_BYhabX92nZWV4VAFLfBtTvI",
    authDomain: "personal-blog-552c4.firebaseapp.com",
    projectId: "personal-blog-552c4",
    storageBucket: "personal-blog-552c4.firebasestorage.app",
    messagingSenderId: "927359965115",
    appId: "1:927359965115:web:9d3a8b29799e599ac6d69e",
    measurementId: "G-3RLY8KW0T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, signInWithPopup };
