import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Your Firebase config - replace with your actual config
// Get this from Firebase Console: Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase config is valid
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value && value !== 'your-api-key-here' && !value.includes('your-')
);

// Initialize Firebase only if configured
let app: FirebaseApp | undefined;
let db: Firestore | undefined;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    // Offline persistence is enabled by default in Firebase v9+
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { db, isFirebaseConfigured };
export default app;

