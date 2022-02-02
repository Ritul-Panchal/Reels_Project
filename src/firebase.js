// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi53zecBm0EMB2jX-gC3osCwi2Op2JvCQ",
  authDomain: "reels-94a40.firebaseapp.com",
  projectId: "reels-94a40",
  storageBucket: "reels-94a40.appspot.com",
  messagingSenderId: "317167725971",
  appId: "1:317167725971:web:c1c57c160969349d86cc66"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage()



