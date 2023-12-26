import "./_activity.scss";

import { useEffect, useState } from "react";

import { AllActivity } from "@/types/types";

import { db } from "@/lib/firebase";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import Informer from "@/components/common/informer/informer";
import ActivityCard from "./components/activity_card";

export default function Activity() {
  const [activity, setActivity] = useState<AllActivity[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "activity"),
      (querySnapshot) => {
        const collectionSnapshot: AllActivity[] = [];

        querySnapshot.forEach((doc: DocumentData) => {
          collectionSnapshot.push(doc.data());
        });

        collectionSnapshot.sort(
          (x, y) => +new Date(y.madeOn) - +new Date(x.madeOn)
        );

        setActivity(collectionSnapshot);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

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
