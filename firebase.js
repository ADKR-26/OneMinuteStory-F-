// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPxJH1UYmQv4JK6kMnRjFBtOA_BNJK74k",
    authDomain: "one-minute-story-adkr.firebaseapp.com",
    projectId: "one-minute-story-adkr",
    storageBucket: "one-minute-story-adkr.appspot.com",
    messagingSenderId: "994664822147",
    appId: "1:994664822147:web:ce2515ec49aa5679fef2b6",
    measurementId: "G-7LE7LCKLJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);