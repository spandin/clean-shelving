import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsFilterCircle, BsPlusCircle, BsSearch } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";
import { Modal } from "@/components/common/modal/modal";
import { Filter } from "@/components/products/filter-product/filter-product";

export default function ProductsHeader({
  productsLenght,
  category,
}: {
  productsLenght: number;
  category: string;
}) {
  const navigate = useNavigate();

  const [filterModalActive, setFilterModalActive] = useState(false);

  return (
    <>
      <div className="products__header">
        <Informer title={category} subtitle={`${productsLenght} позиций`} />
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
