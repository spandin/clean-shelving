import { useState } from "react";

import { BsFilterCircle } from "react-icons/bs";

import { ProductsFilter } from "../..";

import { Modal } from "@/shared/ui/modal/modal";

export default function FilterButton() {
  const [filterModalActive, setFilterModalActive] = useState(false);

  return (
    <>
      <button
        className="circle_button"
        onClick={() => setFilterModalActive(true)}
      >
        <BsFilterCircle />
      </button>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <ProductsFilter />
      </Modal>
    </>
  );
}
