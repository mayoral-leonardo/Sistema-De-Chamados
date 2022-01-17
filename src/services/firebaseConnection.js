import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDb--8I2kqqC4EkGj36quaOiqgTYu0j5-g",
  authDomain: "sistema-de-chamados-79117.firebaseapp.com",
  projectId: "sistema-de-chamados-79117",
  storageBucket: "sistema-de-chamados-79117.appspot.com",
  messagingSenderId: "316175084843",
  appId: "1:316175084843:web:73128f9448142016e7696e",
  measurementId: "G-YJ66YS15L2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
