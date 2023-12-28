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
            className={exported === "all" ? "active" : ""}
            onClick={() => dispatch(setExported("all"))}
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
            className={category === "all" ? "active" : ""}
            onClick={() => dispatch(setCategory("all"))}
          >
            Все
          </button>

          <button
            className={category === "products" ? "active" : ""}
            onClick={() => dispatch(setCategory("products"))}
          >
            Продукты
          </button>

          <button
            className={category === "chemistry" ? "active" : ""}
            onClick={() => dispatch(setCategory("chemistry"))}
          >
            Химия
          </button>

          <button
            className={category === "alcohol" ? "active" : ""}
            onClick={() => dispatch(setCategory("alcohol"))}
          >
            Алкоголь
          </button>

          <button
            className={category === "cosmetic" ? "active" : ""}
            onClick={() => dispatch(setCategory("cosmetic"))}
          >
            Косметика
          </button>

          <button
            className={category === "other" ? "active" : ""}
            onClick={() => dispatch(setCategory("other"))}
          >
            Другое
          </button>
        </div>
      </div>
    </div>
  );
};
