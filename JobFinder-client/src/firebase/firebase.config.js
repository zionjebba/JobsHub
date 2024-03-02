// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF4NKDwt0h2d0iN4K5Hhl7pj6pXVzQ3Hk",
  authDomain: "job-finder-demo.firebaseapp.com",
  projectId: "job-finder-demo",
  storageBucket: "job-finder-demo.appspot.com",
  messagingSenderId: "139050475602",
  appId: "1:139050475602:web:de9b03534db94657e77f8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


export default app;
