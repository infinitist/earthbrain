
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Config provided by user
const firebaseConfig = {
  apiKey: "AIzaSyCxrqoS7KkybYA0hROSZNWJ6jdtPddacL0",
  authDomain: "earth-brain-memorial.firebaseapp.com",
  projectId: "earth-brain-memorial",
  storageBucket: "earth-brain-memorial.firebasestorage.app",
  messagingSenderId: "581050138333",
  appId: "1:581050138333:web:041b92af40859ef891e534",
  measurementId: "G-N1MVYVWESY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
