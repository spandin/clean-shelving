import { AddFormInputsType } from "@/shared/types/types";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/shared/api/firebase-config";
import { UseFormSetValue } from "react-hook-form";

export default function getBarcodesInfo(
  barcode: string,
  setValue: UseFormSetValue<AddFormInputsType>
) {
  const getInfo = async (): Promise<void> => {
    try {
      const docSnap = await getDoc(doc(db, `barcodes/${barcode}`));

      if (docSnap.exists()) {
        setValue("name", docSnap.data().name);
        setValue("category", docSnap.data().category);
      }
    } catch (e) {
      console.error("GET BARCODE INFO:", e);
    }
  };

  return getInfo();
}
