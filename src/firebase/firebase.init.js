// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm50fJgH32wXOwRatsxOSYKfuLYuZ9yTA",
  authDomain: "dutta-hardware.firebaseapp.com",
  projectId: "dutta-hardware",
  storageBucket: "dutta-hardware.appspot.com",
  messagingSenderId: "62089661774",
  appId: "1:62089661774:web:aef25647148a364d51a21f",
  measurementId: "G-0PC2FNVZ8Q"
};

// const firebaseConfig = {
//   apiKey:process.env.REACT_APP_apiKey,
//   authDomain:process.env.REACT_APP_authDomain,
//   projectId:process.env.REACT_APP_projectId,
//   storageBucket:process.env.REACT_APP_storageBucket,
//   messagingSenderId:process.env.REACT_APP_messagingSenderId,
//   appId:process.env.REACT_APP_appId,
//   measurementId:process.env.REACT_APP_measurementId
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app,analytics,auth};