import css from "./_activity-list.module.scss";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";

import { getActivity } from "@/app/slices/dataSlice";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { ActivityCard } from "@/entities/activity";

export default function ActivityList() {
  const dispatch = useAppDispatch();

  const activity = useAppSelector((state) => state.data.activity);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  return (
    <div className={css.activity}>
      <div className={css.activityHeader}>
        <HeaderInformer title="Активности" />
      </div>

      <div className={css.activityBody}>
        {activity && activity.length
          ? activity.map((activity) => (
              <ActivityCard
                key={`${activity.id}${activity.madeOn}`}
                activity={activity}
              />
            ))
          : "Пока никто ничего не сделал :("}
      </div>
    </div>
  );
}
