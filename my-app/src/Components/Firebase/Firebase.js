
import { initializeApp } from "firebase/app";
import {getFirestore ,collection} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBalvNqF-5kRySrnxq6tVDSdkftYV-lVzY",
  authDomain: "filmyverse-d4e72.firebaseapp.com",
  projectId: "filmyverse-d4e72",
  storageBucket: "filmyverse-d4e72.appspot.com",
  messagingSenderId: "638083563521",
  appId: "1:638083563521:web:a9381222810350df178000"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const MoviesRef = collection(db,"Movies");
export const ReviewRef = collection(db,"Review");
export const usersRef = collection(db, "users");

export default app;