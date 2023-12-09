import "./_statistics.scss";

import Informer from "@/components/common/informer/informer";

export default function Statistics() {
  return (
    <div className="statistics">
      <div className="statistics__header">
        <Informer title="Статистика" subtitle="по категориям" />
      </div>
    </div>
  );
}
