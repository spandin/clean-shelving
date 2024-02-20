import { AddFormInputsType } from "@/shared/types/types";

import { getDoc } from "firebase/firestore";
import { query } from "@/shared/api/firebase-config";
import { UseFormSetValue } from "react-hook-form";

export default function getBarcodesInfo(
  barcode: string,
  setValue: UseFormSetValue<AddFormInputsType>
) {
  const getInfo = async (): Promise<void> => {
    try {
      const docSnap = await getDoc(query(`barcodes/${barcode}`));

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
