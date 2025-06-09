// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCXhdkaxh26FNLy--g9JvMAfSmqji1bZS4',
	authDomain: 'login-chat-b0218.firebaseapp.com',
	projectId: 'login-chat-b0218',
	storageBucket: 'login-chat-b0218.firebasestorage.app',
	messagingSenderId: '973364137092',
	appId: '1:973364137092:web:78848829b434d1cbe0c6d1',
	measurementId: 'G-RV5WTZZNQY'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
