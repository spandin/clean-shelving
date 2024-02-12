import "./_rating.scss";
import { UserData } from "@/shared/types/types";

import { useEffect, useState } from "react";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { RatingCard } from "@/entities/rating";

export default function RatingPage() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const collectionSnapshot: UserData[] = [];

      querySnapshot.forEach((doc: DocumentData) => {
        collectionSnapshot.push(doc.data());
      });

      collectionSnapshot.sort(
        (x, y) =>
          y.actions.added +
          y.actions.updated / 4 +
          y.actions.deleted / 2 -
          (x.actions.added + x.actions.updated / 4 + x.actions.deleted / 2)
      );

      setUsers(collectionSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="rating">
      <div className="rating__header">
        <HeaderInformer title="Рейтинг" subtitle="пользователей" />
      </div>

      <div className="rating__body">
        {users.map((user, number) => {
          return <RatingCard key={user.id} user={user} number={number} />;
        })}
      </div>
    </div>
  );
}
