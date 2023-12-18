import { DocumentData, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const dataCollection = collection(db, "data");
export const getDocument = (productId: string): DocumentData => {
  return getDoc(doc(db, `data/${productId}`));
};
