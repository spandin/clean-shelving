import css from "./_activity-page.module.scss";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import ActivityList from "@/widgets/activity-list/activity-list";

export default function ActivityPage() {
  return (
    <div className={css.activity}>
      <div className={css.activityHeader}>
        <HeaderInformer title="Активности" />
      </div>

      <ActivityList />
    </div>
  );
}
