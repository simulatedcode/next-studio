// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASPRgGu1D3A44fb0I5ba066LN_wMPBpQo",
  authDomain: "simulasi-studio.firebaseapp.com",
  projectId: "simulasi-studio",
  storageBucket: "simulasi-studio.firebasestorage.app",
  messagingSenderId: "691701951485",
  appId: "1:691701951485:web:6fd43ab6e2f4e267480794",
  measurementId: "G-8P0W1NLV8J"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, analytics };
