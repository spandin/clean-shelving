import "./_export-button.scss";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { useAppSelector } from "@/hooks/redux-hooks";

import { timestampToString } from "@/lib/date";

import { BsDatabaseDown } from "react-icons/bs";
import { FilteredProducts } from "@/routes/products/filtered-products";

export default function ExportButton({ fileName }: { fileName: string }) {
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

  const { category, exported } = useAppSelector((state) => state.data.filter);
  const products = useAppSelector((state) => state.data.products);

  const dataForExport =
    products &&
    FilteredProducts(products, category, exported).map(
      ({ name, code, quantity, dates, actions }) => ({
        Имя: name,
        Штрихкод: code,
        Количество: quantity,
        Создан: dates.createdAt
          ? timestampToString(dates.createdAt)
          : timestampToString(actions.updated.updatedAt),
        Изготовлен: timestampToString(dates.mfd),
        Просрочится: timestampToString(dates.mfd),
        Статус: actions.exported.isExported ? "Внесён" : "Не внесён",
      })
    );

  return (
    <button
      className="export_button"
      onClick={() => exportToCSV(dataForExport, fileName)}
    >
      <BsDatabaseDown />
    </button>
  );
}
