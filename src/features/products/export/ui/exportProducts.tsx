import css from "./_exportProducts.module.scss";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";
import { setExportActivity, updateProductMark } from "@/app/slices/dataSlice";

import { BsFiletypeXls } from "react-icons/bs";

import exportToXLSX from "../lib/exportToXLSX";
import { productFiltration } from "@/features/products/filter/lib/productFiltration";

export const ExportProducts = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.data.products);
  const filter = useAppSelector((state) => state.data.filter);

  const setProductMark = async () => {
    try {
      exportToXLSX({ products, filter });
      const allId = productFiltration(
        products,
        filter.category,
        filter.exported
      ).map((product) => product.id);

      for (const id of allId) {
        await dispatch(updateProductMark({ id, user }));
      }

      await dispatch(setExportActivity(user));
    } catch (e) {
      console.log(`SET PRODUCT MARK`, e);
    }
  };

  return (
    <div className={css.exportProducts}>
      <h3>Экспорт Excel файла</h3>

      <BsFiletypeXls />
      <p>
        Внимание при экспорте файла, все записи получат статус
        &apos;Внесён&apos;
      </p>
      <button
        onClick={
          user.email === "willstesi@gmail.com" || "marinulik.85@mail.ru"
            ? () => setProductMark()
            : () => exportToXLSX({ products, filter })
        }
      >
        Экспортировать
      </button>
    </div>
  );
};
