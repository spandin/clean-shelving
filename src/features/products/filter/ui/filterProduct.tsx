import css from "./_filterProduct.module.scss";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";

import { setCategory, setExported } from "@/app/slices/dataSlice";

export const Filter = () => {
  const dispatch = useAppDispatch();

  const exported = useAppSelector((state) => state.data.filter.exported);
  const category = useAppSelector((state) => state.data.filter.category);

  return (
    <div className={css.filterProducts}>
      <h3>Фильтр таблицы</h3>

      <div className={css.exported}>
        <span>По статусу выгрузки:</span>
        <div className={css.exportedButtons}>
          <button
            className={exported === "Все" ? css.active : ""}
            onClick={() => dispatch(setExported("Все"))}
          >
            Все
          </button>

          <button
            className={exported === true ? css.active : ""}
            onClick={() => dispatch(setExported(true))}
          >
            Внесённые
          </button>

          <button
            className={exported === false ? css.active : ""}
            onClick={() => dispatch(setExported(false))}
          >
            Не внесённые
          </button>
        </div>
      </div>

      <div className={css.category}>
        <span>По категориям:</span>
        <div className={css.categoryButtons}>
          <button
            className={category === "Все" ? css.active : ""}
            onClick={() => dispatch(setCategory("Все"))}
          >
            Все
          </button>

          <button
            className={category === "Продукты" ? css.active : ""}
            onClick={() => dispatch(setCategory("Продукты"))}
          >
            Продукты
          </button>

          <button
            className={category === "Химия" ? css.active : ""}
            onClick={() => dispatch(setCategory("Химия"))}
          >
            Химия
          </button>

          <button
            className={category === "Алкоголь" ? css.active : ""}
            onClick={() => dispatch(setCategory("Алкоголь"))}
          >
            Алкоголь
          </button>

          <button
            className={category === "Косметика" ? css.active : ""}
            onClick={() => dispatch(setCategory("Косметика"))}
          >
            Косметика
          </button>

          <button
            className={category === "Другое" ? css.active : ""}
            onClick={() => dispatch(setCategory("Другое"))}
          >
            Другое
          </button>
        </div>
      </div>
    </div>
  );
};
