import css from "./_filter-products.module.scss";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";

import { setCategory, setExported } from "@/app/slices/dataSlice";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

export function FilterProducts() {
  const dispatch = useAppDispatch();

  const exported = useAppSelector((state) => state.data.filter.exported);
  const category = useAppSelector((state) => state.data.filter.category);

  return (
    <div className={css.filterProducts}>
      <h3>Фильтр списка</h3>

      <div className={css.exported}>
        <span>По статусу выгрузки:</span>
        <div className={css.exportedButtons}>
          <ActionButton
            className={exported === "Все" ? css.active : ""}
            action={() => dispatch(setExported("Все"))}
          >
            Все
          </ActionButton>

          <ActionButton
            className={exported === true ? css.active : ""}
            action={() => dispatch(setExported(true))}
          >
            Внесённые
          </ActionButton>

          <ActionButton
            className={exported === false ? css.active : ""}
            action={() => dispatch(setExported(false))}
          >
            Не внесённые
          </ActionButton>
        </div>
      </div>

      <div className={css.category}>
        <span>По категориям:</span>
        <div className={css.categoryButtons}>
          <ActionButton
            className={category === "Все" ? css.active : ""}
            action={() => dispatch(setCategory("Все"))}
          >
            Все
          </ActionButton>

          <ActionButton
            className={category === "Продукты" ? css.active : ""}
            action={() => dispatch(setCategory("Продукты"))}
          >
            Продукты
          </ActionButton>

          <ActionButton
            className={category === "Химия" ? css.active : ""}
            action={() => dispatch(setCategory("Химия"))}
          >
            Химия
          </ActionButton>

          <ActionButton
            className={category === "Алкоголь" ? css.active : ""}
            action={() => dispatch(setCategory("Алкоголь"))}
          >
            Алкоголь
          </ActionButton>

          <ActionButton
            className={category === "Косметика" ? css.active : ""}
            action={() => dispatch(setCategory("Косметика"))}
          >
            Косметика
          </ActionButton>

          <ActionButton
            className={category === "Другое" ? css.active : ""}
            action={() => dispatch(setCategory("Другое"))}
          >
            Другое
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
