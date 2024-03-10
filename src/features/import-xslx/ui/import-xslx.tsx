import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

import { setDoc } from "firebase/firestore";
import { query } from "@/shared/api/firebase-config";
import { ProductType } from "@/shared/types/types";

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
            category: row[2],
            quantity: row[3],
            dates: {
              createdAt: parseInt(row[4]),
              mfd: parseInt(row[5]),
              exp: parseInt(row[6]),
            },
            actions: {
              created: {
                createdAt: parseInt(row[6]),
                whoCreated: row[7],
                whoCreatedID: row[9],
              },
              exported: {
                isExported: row[11],
                exportedOn: parseInt(row[10]),
                whoExported: row[12],
                whoExportedID: row[13],
              },
              updated: {
                isUpdated: row[14],
                whoUpdated: row[16],
                whoUpdatedID: row[17],
                updatedAt: parseInt(row[15]),
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
