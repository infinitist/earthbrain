
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Config for ourearthbrain-final-free project
const firebaseConfig = {
  apiKey: "AIzaSyBISvb6V9OR1EsGef5quqCx8FItNu2h9i0",
  authDomain: "ourearthbrain-final-free.firebaseapp.com",
  projectId: "ourearthbrain-final-free",
  storageBucket: "ourearthbrain-final-free.firebasestorage.app",
  messagingSenderId: "860215686097",
  appId: "1:860215686097:web:3459e1a07de2b29b82a6f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
