import css from "./_rating-list.module.scss";

import { UserData } from "@/shared/types/types";

import { useEffect, useState } from "react";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { RatingCard } from "@/entities/rating";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function RatingList() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const collectionSnapshot: UserData[] = [];

      querySnapshot.forEach((doc: DocumentData) => {
        collectionSnapshot.push(doc.data());
        collectionSnapshot.sort(
          (a, b) =>
            b.actions.added +
            b.actions.updated / 4 +
            b.actions.deleted / 2 -
            (a.actions.added + a.actions.updated / 4 + a.actions.deleted / 2)
        );
      });

      setUsers(collectionSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={css.ratingList}>
      <div className={css.listHeader}>
        <HeaderInformer title="Рейтинг" subtitle="пользователей" />
      </div>

      <div className={css.listBody}>
        {users.map((user, number) => {
          return <RatingCard key={user.id} user={user} number={number} />;
        })}
      </div>
    </div>
  );
}
