
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Config provided by user
const firebaseConfig = {
  apiKey: "AIzaSyARwH82JRDlZK5Uy_QH1v0UzZXs3fJPWns",
  authDomain: "ourearthbrain-final.firebaseapp.com",
  projectId: "ourearthbrain-final",
  storageBucket: "ourearthbrain-final.firebasestorage.app",
  messagingSenderId: "253770635233",
  appId: "1:253770635233:web:06a4cf87410a85d59b24a0",
  measurementId: "G-90W3FPHHN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
