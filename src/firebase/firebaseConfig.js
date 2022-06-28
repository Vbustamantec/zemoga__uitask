import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB73p4rBtDjngnqsMotvgc0gXcEOvRbRRw',
  authDomain: 'zemogavoting.firebaseapp.com',
  projectId: 'zemogavoting',
  storageBucket: 'zemogavoting.appspot.com',
  messagingSenderId: '767678077843',
  appId: '1:767678077843:web:1d288266d7c3ef448a6666',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
