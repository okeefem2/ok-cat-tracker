import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyBDGiXhuTwj_o1NkwgemV8IWsVBg7AhSOc',
    authDomain: 'ok-cat-tracker.firebaseapp.com',
    projectId: 'ok-cat-tracker',
    storageBucket: 'ok-cat-tracker.appspot.com',
    messagingSenderId: '966720947490',
    appId: '1:966720947490:web:53d3c0d897df038bca117b',
    measurementId: 'G-0N9MKF49R3',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export const db = firebase.firestore();
