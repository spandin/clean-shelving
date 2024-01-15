import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsFilterCircle, BsPlusCircle, BsSearch } from "react-icons/bs";

import { Filter } from "@/features/products/filter/ui/filterProduct";
import Informer from "@/widgets/informer/informer";
import { Modal } from "@/shared/components/common/modal/modal";

export default function ProductsHeader({
  productsLenght,
  category,
  exported,
}: {
  productsLenght: number;
  category: string;
  exported: string | boolean;
}) {
  const navigate = useNavigate();

  const [filterModalActive, setFilterModalActive] = useState(false);

  return (
    <>
      <div className="products__header">
        <Informer
          title={`${category} ${
            exported === "Все" ? "🙌" : exported === true ? "👍" : "👎"
          } `}
          subtitle={`${productsLenght} позиций`}
        />
        <div className="products__header__buttons">
          <button
            className="circle_button"
            id="add"
            onClick={() => navigate("/add/")}
          >
            <BsPlusCircle />
          </button>
          <button
            className="circle_button"
            id="filter"
            onClick={() => setFilterModalActive(true)}
          >
            <BsFilterCircle />
          </button>
          <button className="circle_button" id="search">
            <BsSearch />
          </button>
        </div>
      </div>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <Filter />
      </Modal>
    </>
  );
}
