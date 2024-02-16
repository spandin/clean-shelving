import css from "./_rating-list.module.scss";

import { RatingCard } from "@/entities/rating";
import { useAppSelector } from "@/shared/lib/hooks/use-redux";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function RatingList() {
  const users = useAppSelector((state) => state.data.users);

  const copyArrayUsers = [...users];

  copyArrayUsers.sort(
    (a, b) =>
      b.actions.added +
      b.actions.updated / 4 +
      b.actions.deleted / 2 -
      (a.actions.added + a.actions.updated / 4 + a.actions.deleted / 2)
  );

  return (
    <div className={css.ratingList}>
      <div className={css.listHeader}>
        <HeaderInformer title="Рейтинг" subtitle="пользователей" />
      </div>

      <div className={css.listBody}>
        {copyArrayUsers.map((user, number) => {
          return <RatingCard key={user.id} user={user} number={number} />;
        })}
      </div>
    </div>
  );
}
