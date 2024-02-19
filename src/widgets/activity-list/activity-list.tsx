import css from "./_activity-list.module.scss";

import { ActivityCard } from "@/entities/activity";
import { db } from "@/shared/api/firebase-config";
import { Activity } from "@/shared/types/types";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ActivityList() {
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "activity"),
      (querySnapshot) => {
        const collectionSnapshot: Activity[] = [];

        querySnapshot.forEach((doc: DocumentData) => {
          collectionSnapshot.push(doc.data());
          collectionSnapshot.sort(
            (a, b) => +new Date(b.madeOn) - +new Date(a.madeOn)
          );
        });

        setActivity(collectionSnapshot);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

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
