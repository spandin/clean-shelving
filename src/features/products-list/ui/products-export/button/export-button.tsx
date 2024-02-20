import css from "./_export-button.module.scss";

import { useState } from "react";

import { BsDatabaseDown } from "react-icons/bs";

import { ProductsExport } from "../../..";
import { Modal } from "@/shared/ui/modal/modal";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

export default function ExportButton() {
  const [exportModalActive, setExportModalActive] = useState(false);

  return (
    <>
      <ActionButton
        className={css.exportButton}
        action={() => setExportModalActive(true)}
      >
        <BsDatabaseDown />
      </ActionButton>

      <Modal active={exportModalActive} setActive={setExportModalActive}>
        <ProductsExport />
      </Modal>
    </>
  );
}
