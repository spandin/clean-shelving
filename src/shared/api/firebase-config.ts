import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { doc, initializeFirestore } from "firebase/firestore";
import { persistentLocalCache } from "firebase/firestore";

export const firebaseConfig: { [key: string]: string } = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = initializeFirestore(firebase, {
  localCache: persistentLocalCache(/*settings*/ {}),
});

export const query = (q: string) => doc(db, `${q}`);
