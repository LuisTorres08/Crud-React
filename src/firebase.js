
import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGoZRtv2V5ekd1-lTUrKJvGKPuRGfpWsk",
  authDomain: "crud-react-firebase-8de31.firebaseapp.com",
  projectId: "crud-react-firebase-8de31",
  storageBucket: "crud-react-firebase-8de31.appspot.com",
  messagingSenderId: "286132485895",
  appId: "1:286132485895:web:0ee218cc773542d70c8fa2"
};


firebase.initializeApp(firebaseConfig);
export{firebase}