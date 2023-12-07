import { BsFilterCircle, BsPlusCircle, BsSearch } from "react-icons/bs";

export default function ProductsHeader() {
  return (
    <div className="products__header">
      <div className="products__header__informer">
        <span>Продукты</span>
        <span>243 позиции</span>
      </div>
      <div className="products__header__buttons">
        <button id="add">
          <BsPlusCircle />
        </button>
        <button id="filter">
          <BsFilterCircle />
        </button>
        <button id="search">
          <BsSearch />
        </button>
      </div>
    </div>
  );
}