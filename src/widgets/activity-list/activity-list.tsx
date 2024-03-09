import css from "./_activity-list.module.scss";

import { Activity } from "@/shared/types/types";

import { useEffect, useState } from "react";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { ActivityCard } from "@/entities/activity";

import { useTheme } from "@/shared/lib/hooks/use-theme";
import PulsarLoader from "@/shared/ui/pulsar-loader/pulsar-loader";
import { IMAGES_DARK, IMAGES_LIGHT } from "@/assets";

export default function ActivityList() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setIsError] = useState(false);

  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const getActivity = onSnapshot(
      collection(db, "activity"),
      (querySnapshot) => {
        try {
          const collectionSnapshot: Activity[] = [];

          querySnapshot.forEach((doc: DocumentData) => {
            collectionSnapshot.push(doc.data());
            collectionSnapshot.sort(
              (a, b) => +new Date(b.madeOn) - +new Date(a.madeOn)
            );
          });

          if (collectionSnapshot.length === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setActivity(collectionSnapshot);
          }
        } catch (error) {
          console.error("ACTIVITY LIST: " + error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    );

    return () => {
      getActivity();
    };
  }, []);

  if (isError) {
    return <div className={css.isState}>Ошибка загрузки</div>;
  }

  if (isLoading) {
    return (
      <div className={css.isState}>
        <PulsarLoader size={20} />
        Загрузка активностей
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={css.isState}>
        <img
          src={
            isDark ? IMAGES_DARK.empty_activity_d : IMAGES_LIGHT.empty_activity
          }
        />
        Активностей не обнаружено
      </div>
    );
  }

  return (
    <div className={css.activityList}>
      {activity.map((activity, index) => (
        <ActivityCard
          key={`${activity.id}${activity.madeOn}`}
          activity={activity}
          number={index}
        />
      ))}
    </div>
  );
}
