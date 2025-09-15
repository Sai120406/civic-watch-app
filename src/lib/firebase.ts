// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-5022590512-361a5',
  appId: '1:399133281337:web:76b2c1bc0462b191ed51e8',
  storageBucket: 'studio-5022590512-361a5.firebasestorage.app',
  apiKey: 'AIzaSyBBAXsdn2K1UYkhBQCPDQHFPBxwooR-aEc',
  authDomain: 'studio-5022590512-361a5.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '399133281337',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
