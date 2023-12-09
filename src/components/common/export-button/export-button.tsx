import "./_export-button.scss";

import { BsDatabaseDown } from "react-icons/bs";

export default function ExportButton() {
  return (
    <button className="export_button">
      <BsDatabaseDown />
    </button>
  );
}
