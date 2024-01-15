import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { persistentLocalCache } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig: { [key: string]: string } = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*settings*/ {}),
});
export const storage = getStorage(app);
