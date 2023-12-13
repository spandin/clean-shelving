import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const dataCollection = collection(db, 'data')