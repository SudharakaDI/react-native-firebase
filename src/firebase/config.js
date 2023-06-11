// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCT8fK2cDZNglr9qj_RLw6Y6uOlE5NQdX8",
//     authDomain: "react-native-app-2dee1.firebaseapp.com",
//     projectId: "react-native-app-2dee1",
//     storageBucket: "react-native-app-2dee1.appspot.com",
//     messagingSenderId: "551729486224",
//     appId: "1:551729486224:web:491d26cf4266efda183b15",
//     measurementId: "G-G1N9T5F7MZ"
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// export { firebase };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCT8fK2cDZNglr9qj_RLw6Y6uOlE5NQdX8",
  authDomain: "react-native-app-2dee1.firebaseapp.com",
  projectId: "react-native-app-2dee1",
  storageBucket: "react-native-app-2dee1.appspot.com",
  messagingSenderId: "551729486224",
  appId: "1:551729486224:web:491d26cf4266efda183b15",
  measurementId: "G-G1N9T5F7MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
