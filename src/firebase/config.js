
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBcH9K-iQhoWWWTW_BfbGEv5sCDN1KTysA",
    authDomain: "music-app-f7151.firebaseapp.com",
    projectId: "music-app-f7151",
    storageBucket: "music-app-f7151.appspot.com",
    messagingSenderId: "501815115161",
    appId: "1:501815115161:web:76546081a2132fa65ee708"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

//Generate Timestamp
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;