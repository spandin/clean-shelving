import { ProductType } from "@/shared/types/types";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { filtrationSwitch } from "@/features/filter-products";

import { timestampToString } from "@/shared/helpers/parse-date";

interface Props {
  products: ProductType[];
  filter: {
    category: string;
    exported: string | boolean;
  };
}

export default function exportToXLSX({ products, filter }: Props) {
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

  const exportData =
    products &&
    filtrationSwitch(products, filter.category, filter.exported).map(
      ({ name, code, quantity, dates, actions }) => ({
        Имя: name,
        Штрихкод: code,
        Количество: quantity,
        Создан: timestampToString(dates.createdAt),
        Изготовлен: timestampToString(dates.mfd),
        Просрочится: timestampToString(dates.exp),
        Статус: actions.exported.isExported ? "Внесён" : "Не внесён",
      })
    );

  return exportToCSV(exportData, "CS-ProductsTable");
}
