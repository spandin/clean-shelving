import css from "./_rating-list.module.scss";

import { UserData } from "@/shared/types/types";

import { useEffect, useState } from "react";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { RatingCard } from "@/entities/rating";

import PulsarLoader from "@/shared/ui/pulsar-loader/pulsar-loader";

export default function RatingList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const getUsers = onSnapshot(collection(db, "users"), (querySnapshot) => {
      try {
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
      } catch (error) {
        console.error("RATING LIST: " + error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      getUsers();
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

  return (
    <div className={css.listBody}>
      {users.map((user, number) => {
        return <RatingCard key={user.id} user={user} number={number} />;
      })}
    </div>
  );
}
