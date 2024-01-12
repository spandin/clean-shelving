import "./_informer.scss";

import { useLocation } from "react-router-dom";

import ExportButton from "../buttons/export-button/export-button";
import BackButton from "../buttons/back-button/back-button";

interface InformerProps {
  title: string;
  subtitle?: string | null;
}

export default function Informer({ title, subtitle }: InformerProps) {
  const location = useLocation();

  return (
    <div className="informer">
      {location.pathname != "/products/" ? <BackButton /> : <ExportButton />}
      <div className="informer__col">
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
