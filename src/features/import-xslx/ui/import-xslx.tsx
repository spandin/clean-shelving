import * as XLSX from "xlsx";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { setDoc } from "firebase/firestore";
import { query } from "@/shared/api/firebase-config";

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
          await setDoc(query(`barcodes/${row[0]}`), {
            code: row[0],
            name: row[1],
            category: row[2],
          });
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
