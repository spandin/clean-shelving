import "./_settings.scss";

import Informer from "@/components/common/informer/informer";

export default function Settings() {
  return (
    <div className="settings">
      <div className="settings__header">
        <Informer title="Настройки" />
      </div>
    </div>
  );
}
