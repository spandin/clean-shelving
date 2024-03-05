import { useState } from "react";

import { BsFilterCircle } from "react-icons/bs";

import { FilterProducts } from "@/features/filter-products";

import { Modal } from "@/shared/ui/modal/modal";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

export default function FilterButton() {
  const [filterModalActive, setFilterModalActive] = useState(false);

  return (
    <>
      <ActionButton
        className={filterModalActive ? "circle_button active" : "circle_button"}
        action={() => setFilterModalActive(true)}
      >
        <BsFilterCircle />
      </ActionButton>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <FilterProducts />
      </Modal>
    </>
  );
}
