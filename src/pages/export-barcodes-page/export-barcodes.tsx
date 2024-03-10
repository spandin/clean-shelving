import XLSX from "xlsx";

import { useAppSelector } from "@/shared/hooks/use-redux";

export const ExportDataToExcel = () => {
  const data = useAppSelector((state) => state.data.barcodes); // Получаем данные из хранилища Redux

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  return (
    <div>
      <button onClick={XLSX.writeFile(wb, "exported_data.xlsx")}>
        Скачать БД ШК
      </button>
    </div>
  );
};
