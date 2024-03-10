import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { useAppSelector } from "@/shared/hooks/use-redux";

export default function ExportDataToExcel() {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const data = useAppSelector((state) => state.data.products);

  const exportData = data.map(({ name, code, category }) => ({
    Штрихкод: code,
    Имя: name,
    Категория: category,
  }));

  return (
    <div>
      <button
        value={"Скачать"}
        onClick={() => exportToCSV(exportData, "CS-Barcodes")}
      />
    </div>
  );
}
