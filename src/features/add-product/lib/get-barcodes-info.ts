import { AddFormInputsType } from "@/types/types";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/shared/api/firebase-config";
import { UseFormSetValue } from "react-hook-form";

export default function CalcExpirationDate(
  barcode: string,
  setValue: UseFormSetValue<AddFormInputsType>
) {
  const getBarcodesInfo = async (): Promise<void> => {
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

  return getBarcodesInfo();
}
