import Informer from "@/components/common/informer/informer";
import { BsFilterCircle, BsPlusCircle, BsSearch } from "react-icons/bs";

export default function ProductsHeader() {
  return (
    <div className="products__header">
      <Informer title="Категория" subtitle="Кол. позиций" />
      <div className="products__header__buttons">
        <button className="circle_button" id="add">
          <BsPlusCircle />
        </button>
        <button className="circle_button" id="filter">
          <BsFilterCircle />
        </button>
        <button className="circle_button" id="search">
          <BsSearch />
        </button>
      </div>
    </div>
  );
}
