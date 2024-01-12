import "./_activity.scss";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { getActivity } from "@/store/slices/dataSlice";

import ActivityCard from "./components/activity_card";
import Informer from "@/shared/components/common/informer/informer";

export default function Activity() {
  const dispatch = useAppDispatch();

  const activity = useAppSelector((state) => state.data.activity);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  return (
    <div className="activity">
      <div className="activity__header">
        <Informer title="Активности" />
      </div>

      <div className="activity__body">
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
