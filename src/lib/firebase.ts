/**
 * @license
 * Copyright 2024 Neural Networks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
