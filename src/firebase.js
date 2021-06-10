import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuYMu2I3C_J7N17pHc9t7IsOEiwX3LOUk",
    authDomain: "whatsapp-clone-2aa06.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-2aa06-default-rtdb.firebaseio.com",
    projectId: "whatsapp-clone-2aa06",
    storageBucket: "whatsapp-clone-2aa06.appspot.com",
    messagingSenderId: "698817995987",
    appId: "1:698817995987:web:9324efc424e806834ba026",
    measurementId: "G-KPNGVJP6GZ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseDB = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default firebaseDB;

