import css from "./_export-products.module.scss";

import exportToXLSX from "../lib/export-to-XLSX";
import { changeExportState } from "../store/change-export-state";
import { addExportActivity } from "../store/add-export-activity";

import { filtrationSwitch } from "@/features/filter-products";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

import IMAGES from "@/assets";

export function ExportProducts() {
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
        const allId = filtrationSwitch(
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
      <h3>Экспорт Excel</h3>

      <img src={IMAGES.export_products} />

      <p>
        *Внимание при экспорте файла, все записи получат статус
        &apos;Внесён&apos;
      </p>

      <ActionButton
        className={css.exportButton}
        action={() => exportAndChangeExportState()}
      >
        Экспортировать
      </ActionButton>
    </div>
  );
}
