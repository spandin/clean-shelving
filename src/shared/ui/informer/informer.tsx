import "./_informer.scss";

import { useLocation } from "react-router-dom";

import ExportButton from "@/features/products-list/ui/products-export/button/export-button";
import BackButton from "@/shared/ui/back-button/back-button";

interface Props {
  title: string;
  subtitle?: string | null;
}

export default function Informer({ title, subtitle }: Props) {
  const location = useLocation();

  return (
    <div className="informer">
      {location.pathname !== "/products/" ? <BackButton /> : <ExportButton />}
      <div className="informer__col">
        <span>{title}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
