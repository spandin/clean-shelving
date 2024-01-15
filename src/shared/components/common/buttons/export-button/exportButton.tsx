import css from "./_exportButton.module.scss";
import { useState } from "react";

import { BsDatabaseDown } from "react-icons/bs";

import { Modal } from "../../modal/modal";
import { ExportProducts } from "@/features/products/export/ui/exportProducts";

export default function ExportButton() {
  const [exportModalActive, setExportModalActive] = useState(false);
  return (
    <>
      <button
        className={css.exportButton}
        onClick={() => setExportModalActive(true)}
      >
        <BsDatabaseDown />
      </button>

      <Modal active={exportModalActive} setActive={setExportModalActive}>
        <ExportProducts />
      </Modal>
    </>
  );
}
