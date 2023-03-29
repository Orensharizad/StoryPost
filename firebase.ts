// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLBBAutMUPP3cPraTT3HVJihd-tNGtGhM",
    authDomain: "insta-clone-3835b.firebaseapp.com",
    projectId: "insta-clone-3835b",
    storageBucket: "insta-clone-3835b.appspot.com",
    messagingSenderId: "162651758916",
    appId: "1:162651758916:web:244adaac7d7d6181227711"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore()

const storage = getStorage()

export { app, db, storage }