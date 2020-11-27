import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKGhzKroP6J8sDjV6VnvrjGbiBe43a7-A",
  authDomain: "crud-react-udemy-90f23.firebaseapp.com",
  databaseURL: "https://crud-react-udemy-90f23.firebaseio.com",
  projectId: "crud-react-udemy-90f23",
  storageBucket: "crud-react-udemy-90f23.appspot.com",
  messagingSenderId: "922753188008",
  appId: "1:922753188008:web:be78f2918789306457c29d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, firebase, db, storage };
