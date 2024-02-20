import css from "./_products-export.module.scss";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";
import { changeExportState } from "../../model/change-export-state";
import { addExportActivity } from "../../model/add-export-activity";

import { BsFiletypeXls } from "react-icons/bs";
import exportToXLSX from "../../lib/export-to-XLSX";
import productsFiltration from "../../lib/products-filtration";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

export function ProductsExport() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.data.products);
  const filter = useAppSelector((state) => state.data.filter);

  const exportAndChangeExportState = async () => {
    try {
      // Вызов функции экспортирования файла
      exportToXLSX({ products, filter });

      // Проверка прав на смену стейта экспорта
      if (user.email === ("willstesi@gmail.com" || "marinulik.85@mail.ru")) {
        // Цикл для сменны статуса продукта
        const allId = productsFiltration(
          products,
          filter.category,
          filter.exported
        ).map((product) => product.id);

        for (const id of allId) {
          await dispatch(changeExportState({ id, user }));
        }

        // Добавление в активности при экспорте
        await dispatch(addExportActivity(user));
      }
    } catch (e) {
      console.error(`EXPORT/CHANGE EXPORT STATE`, e);
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

      <ActionButton action={() => exportAndChangeExportState()}>
        Экспортировать
      </ActionButton>
    </div>
  );
}
