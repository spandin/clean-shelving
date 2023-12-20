import { useNavigate } from "react-router-dom";

import { BsFilterCircle, BsPlusCircle, BsSearch } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";

export default function ProductsHeader({ props }: { props: number }) {
  const navigate = useNavigate();

  return (
    <div className="products__header">
      <Informer title="Категория" subtitle={`${props} позиции`} />
      <div className="products__header__buttons">
        <button
          className="circle_button"
          id="add"
          onClick={() => navigate("/add/")}
        >
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
