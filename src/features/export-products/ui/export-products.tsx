import css from "./_export-products.module.scss";

import { useState } from "react";

import exportToXLSX from "../lib/export-to-XLSX";
import { changeExportState } from "../store/change-export-state";
import { addExportActivity } from "../store/add-export-activity";

import { filtrationSwitch } from "@/features/filter-products";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useTheme } from "@/shared/hooks/use-theme";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";
import PulsarLoader from "@/shared/ui/pulsar-loader/pulsar-loader";

import { ROLES_CAN_EXPORTING } from "@/shared/consts";

import { IMAGES_LIGHT, IMAGES_DARK } from "@/assets";

export function ExportProducts() {
  const dispatch = useAppDispatch();
  const { isDark } = useTheme();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [count, setCount] = useState(0);

  const user = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.data.products);
  const filter = useAppSelector((state) => state.data.filter);

  const allProductsId = filtrationSwitch(
    products,
    filter.category,
    filter.exported
  ).map((product) => product.id);

  const exportAndChangeExportState = async () => {
    try {
      setIsExporting(true);

      exportToXLSX({ products, filter });

      if (ROLES_CAN_EXPORTING.includes(user.role)) {
        for (const id of allProductsId) {
          await dispatch(changeExportState({ id, user }));
          setCount((prevCount) => prevCount + 1);
        }

        await dispatch(addExportActivity(user));
        setIsExporting(true);
      }
    } catch (e) {
      console.error("EXPORT AND CHANGE EXPORT STATE: " + e);
    } finally {
      setCount(0);
      setIsExporting(false);
      if (ROLES_CAN_EXPORTING.includes(user.role)) {
        setIsCompleted(true);
      }
    }
  };

  if (isCompleted) {
    return (
      <div className={css.isCompleted}>
        <h3>Завершенно успешно</h3>

        <img
          src={
            isDark
              ? IMAGES_DARK.change_state_completed_d
              : IMAGES_LIGHT.change_state_completed
          }
        />

        <p>Изменение прошло успешно, можете заниматься своими делами.</p>

        <ActionButton
          className={css.isCompletedButton}
          action={() => setIsCompleted(false)}
        >
          Закрыть
        </ActionButton>
      </div>
    );
  }

  if (isExporting) {
    return (
      <div className={css.isExporting}>
        <h3>Изменение статусов</h3>

        <img
          src={isDark ? IMAGES_DARK.change_state_d : IMAGES_LIGHT.change_state}
        />

        <div>
          <PulsarLoader size={20} />
          <p>Изменено: {count} статусов</p>
        </div>

        <p>*Не закрывайте приложения во время изменения статусов.</p>
      </div>
    );
  }

  return (
    <div className={css.exportProducts}>
      <h3>Экспорт Excel</h3>

      <img
        src={
          isDark ? IMAGES_DARK.export_products_d : IMAGES_LIGHT.export_products
        }
      />

      <p>
        Файл будет содержать информацию о продуктах в соответствий с вашим
        фильтром.
      </p>

      {ROLES_CAN_EXPORTING.includes(user.role) ? (
        <p>
          *Внимание при экспорте файла, все записи получат статус
          &apos;Внесён&apos;
        </p>
      ) : null}

      <ActionButton
        className={css.exportButton}
        action={() => exportAndChangeExportState()}
      >
        Экспортировать
      </ActionButton>
    </div>
  );
}
