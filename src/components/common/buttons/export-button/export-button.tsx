import "./_export-button.scss";
import { useState } from "react";

import { BsDatabaseDown } from "react-icons/bs";

import { Modal } from "../../modal/modal";
import { ExportProduct } from "@/features/products/export-product/export-product";

export default function ExportButton() {
  const [exportModalActive, setExportModalActive] = useState(false);
  return (
    <>
      <button
        className="export_button"
        onClick={() => setExportModalActive(true)}
      >
        <BsDatabaseDown />
      </button>

      <Modal active={exportModalActive} setActive={setExportModalActive}>
        <ExportProduct />
      </Modal>
    </>
  );
}
