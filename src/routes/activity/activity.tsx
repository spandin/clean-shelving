import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import "./_activity.scss";

import Informer from "@/components/common/informer/informer";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { AllActivity } from "@/types/types";
import ActivityCard from "./components/activity_card";
import { Ring } from "@uiball/loaders";
import { useTheme } from "@/hooks/use-theme";

export default function Activity() {
  const { isDark } = useTheme();

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
        {activity && activity.length ? (
          activity.map((activity) => (
            <ActivityCard
              key={`${activity.id}${activity.madeOn}`}
              activity={activity}
            />
          ))
        ) : (
          <Ring size={30} color={isDark ? "#ffffff" : "#121212"} />
        )}
      </div>
    </div>
  );
}
