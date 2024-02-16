import css from "./_activity-list.module.scss";

import { ActivityCard } from "@/entities/activity";
import { useAppSelector } from "@/shared/lib/hooks/use-redux";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function ActivityList() {
  const activity = useAppSelector((state) => state.data.activity);

  return (
    <div className={css.activity}>
      <div className={css.activityHeader}>
        <HeaderInformer title="Активности" />
      </div>

      <div className={css.activityBody}>
        {activity && activity.length
          ? activity.map((activity, index) => (
              <ActivityCard
                key={`${activity.id}${activity.madeOn}`}
                activity={activity}
                number={index}
              />
            ))
          : "Пока никто ничего не сделал :("}
      </div>
    </div>
  );
}
