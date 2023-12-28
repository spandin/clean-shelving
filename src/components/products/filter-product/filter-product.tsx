import "./_filter-product.scss";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { setCategory, setExported } from "@/store/slices/dataSlice";

export const Filter = () => {
  const dispatch = useAppDispatch();

  const exported = useAppSelector((state) => state.data.filter.exported);
  const category = useAppSelector((state) => state.data.filter.category);

  return (
    <div className="filter">
      <h3>Фильтр таблицы</h3>

      <div className="exported">
        <span>По статусу выгрузки:</span>
        <div className="exported__buttons">
          <button
            className={exported === "Все" ? "active" : ""}
            onClick={() => dispatch(setExported("Все"))}
          >
            Все
          </button>

          <button
            className={exported === true ? "active" : ""}
            onClick={() => dispatch(setExported(true))}
          >
            Внесённые
          </button>

          <button
            className={exported === false ? "active" : ""}
            onClick={() => dispatch(setExported(false))}
          >
            Не внесённые
          </button>
        </div>
      </div>

      <div className="category">
        <span>По категориям:</span>
        <div className="category__buttons">
          <button
            className={category === "Все" ? "active" : ""}
            onClick={() => dispatch(setCategory("Все"))}
          >
            Все
          </button>

          <button
            className={category === "Продукты" ? "active" : ""}
            onClick={() => dispatch(setCategory("Продукты"))}
          >
            Продукты
          </button>

          <button
            className={category === "Химия" ? "active" : ""}
            onClick={() => dispatch(setCategory("Химия"))}
          >
            Химия
          </button>

          <button
            className={category === "Алкоголь" ? "active" : ""}
            onClick={() => dispatch(setCategory("Алкоголь"))}
          >
            Алкоголь
          </button>

          <button
            className={category === "Косметика" ? "active" : ""}
            onClick={() => dispatch(setCategory("Косметика"))}
          >
            Косметика
          </button>

          <button
            className={category === "Другое" ? "active" : ""}
            onClick={() => dispatch(setCategory("Другое"))}
          >
            Другое
          </button>
        </div>
      </div>
    </div>
  );
};
