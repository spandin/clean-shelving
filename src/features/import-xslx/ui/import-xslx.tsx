import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

import { setDoc } from "firebase/firestore";
import { query } from "@/shared/api/firebase-config";
import { ProductType } from "@/shared/types/types";
import { stringToTimestamp } from "@/shared/helpers/date";
import { getTime } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";

export function ImportXSLX() {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file: any) => file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleFileUpload = async () => {
    if (files.length === 0) {
      alert("Выберите файл для загрузки");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        rows.forEach(async (row: any) => {
          const id = nanoid();
          const productObject: ProductType = {
            id: id,
            name: row[0],
            code: parseInt(row[1]),
            category: data.category,
            quantity: row[2],
            dates: {
              createdAt: getTime(new Date()),
              mfd: stringToTimestamp(row[3]),
              exp: stringToTimestamp(row[4]),
            },
            actions: {
              //   created: {
              //     createdAt: getTime(new Date()),
              //     whoCreated: `${currentUser.name}`,
              //     whoCreatedID: `${currentUser.id}`,
              //   },
              updated: {
                isUpdated: false,
                whoUpdated: "",
                whoUpdatedID: "",
                updatedAt: 0,
              },
              exported: {
                isExported: false,
                exportedOn: 0,
                whoExported: "",
                whoExportedID: "",
              },
            },
          };

          await setDoc(query(`data/${id}`), productObject);
        });
      });
    };

    reader.readAsBinaryString(files[0]);
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Перетащите сюда файл XLSX</p>
      </div>
      <button onClick={handleFileUpload}>Загрузить файл</button>
    </div>
  );
}
