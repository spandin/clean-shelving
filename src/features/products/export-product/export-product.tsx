import "./_export-product.scss";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { setExportActivity, updateProductMark } from "@/store/slices/dataSlice";

import { timestampToString } from "@/shared/helpers/parse-date";

import { BsFiletypeXls } from "react-icons/bs";

import { FilteredProducts } from "@/pages/products/filtered-products";

export const ExportProduct = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.data.products);
  const { category, exported } = useAppSelector((state) => state.data.filter);

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
    FilteredProducts(products, category, exported).map(
      ({ name, code, quantity, dates, actions }) => ({
        Имя: name,
        Штрихкод: code,
        Количество: quantity,
        Создан: dates.createdAt
          ? timestampToString(dates.createdAt)
          : timestampToString(actions.updated.updatedAt),
        Изготовлен: timestampToString(dates.mfd),
        Просрочится: timestampToString(dates.exp),
        Статус: actions.exported.isExported ? "Внесён" : "Не внесён",
      })
    );

  const setProductMark = async () => {
    try {
      exportToCSV(
        exportData,
        `${category} ${
          exported === "Все" ? "🙌" : exported === true ? "👍" : "👎"
        } `
      );

      const allId = FilteredProducts(products, category, exported).map(
        (product) => product.id
      );

      for (const id of allId) {
        await dispatch(updateProductMark({ id, user }));
      }

      await dispatch(setExportActivity(user));
    } catch (e) {
      console.log(`SET PRODUCT MARK`, e);
    }
  };

  return (
    <div className="export-product">
      <h3>Экспорт Excel файла</h3>

      <BsFiletypeXls />
      <p>
        Внимание при экспорте файла, все записи получат статус
        &apos;Внесён&apos;
      </p>
      <button
        onClick={
          user.email === "willstesi@gmail.com" && "marinulik.85@mail.ru"
            ? () => setProductMark()
            : () =>
                exportToCSV(
                  exportData,
                  `${category} ${
                    exported === "Все" ? "🙌" : exported === true ? "👍" : "👎"
                  } `
                )
        }
      >
        Экспортировать
      </button>
    </div>
  );
};
