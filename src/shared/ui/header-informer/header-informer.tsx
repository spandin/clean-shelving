import "./_header-informer.scss";

import { useLocation } from "react-router-dom";

import ExportButton from "@/shared/ui/buttons/export-button/export-button";
import BackButton from "@/shared/ui/buttons/back-button/back-button";

interface Props {
  title: string;
  subtitle?: string | null;
}

export default function HeaderInformer({ title, subtitle }: Props) {
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
