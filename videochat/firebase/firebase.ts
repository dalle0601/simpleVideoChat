// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBMeTQH4bOnwqBO2RBnJMafIsr9U4x_9_w',
    authDomain: 'react-next-app-3509e.firebaseapp.com',
    projectId: 'react-next-app-3509e',
    storageBucket: 'react-next-app-3509e.appspot.com',
    messagingSenderId: '643593426135',
    appId: '1:643593426135:web:9dc98ea878cb2fd5808c92',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
