// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJIzaOq94X8IiGhd3rVe-trVtUzhCgmxU",
  authDomain: "traveling-tour.firebaseapp.com",
  projectId: "traveling-tour",
  storageBucket: "traveling-tour.appspot.com",
  messagingSenderId: "852991335640",
  appId: "1:852991335640:web:7ca55fedd9a8c906f58bad",
  measurementId: "G-WK0M46442P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
