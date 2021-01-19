import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCw_YJmq6alcnalhpPM9N9farHAf1Du-kk',
  authDomain: 'my-shop-bac8d.firebaseapp.com',
  projectId: 'my-shop-bac8d',
  storageBucket: 'my-shop-bac8d.appspot.com',
  messagingSenderId: '1071142700539',
  appId: '1:1071142700539:web:6eaf34a8d2b6377568375e',
  measurementId: 'G-F947KGH8RQ',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
