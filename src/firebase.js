import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCCR_myRLUeOxIgZM3dKza_b-3I3ZUMYb8",
    authDomain: "gt-assistant-1387d.firebaseapp.com",
    projectId: "gt-assistant-1387d",
    storageBucket: "gt-assistant-1387d.appspot.com",
    messagingSenderId: "298325532010",
    appId: "1:298325532010:web:ec45d49529cdc4fe075913"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()