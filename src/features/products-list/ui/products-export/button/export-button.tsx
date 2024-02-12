import css from "./_export-button.module.scss";

import { useState } from "react";

import { BsDatabaseDown } from "react-icons/bs";

import { ProductsExport } from "../../..";

import { Modal } from "@/shared/ui/modal/modal";

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
        <ProductsExport />
      </Modal>
    </>
  );
}
