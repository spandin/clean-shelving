import css from "./_activityList.module.scss";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";

import { getActivity } from "@/app/slices/dataSlice";

import ActivityCard from "@/entities/activity/ui/activityCard";
import Informer from "@/shared/ui/informer/informer";

export default function ActivityList() {
  const dispatch = useAppDispatch();

  const activity = useAppSelector((state) => state.data.activity);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  return (
    <div className={css.activity}>
      <div className={css.activityHeader}>
        <Informer title="Активности" />
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
