// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    doc,
    getDoc,
    setDoc,
    getFirestore,
    collection,
    writeBatch,
    query,
    getDocs,
  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB4fX2vcE0aH4VbJBzabcsu4rFwoXmEIk",
  authDomain: "zfund-kyc.firebaseapp.com",
  projectId: "zfund-kyc",
  storageBucket: "zfund-kyc.firebasestorage.app",
  messagingSenderId: "533962576423",
  appId: "1:533962576423:web:f1eca32dd7244da5497402",
  measurementId: "G-LY9F1SSS7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);