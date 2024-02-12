import css from "./_rating-card.module.scss";

import { UserData } from "@/shared/types/types";

import { Link } from "react-router-dom";

export function RatingCard({
  user,
  number,
}: {
  user: UserData;
  number: number;
}) {
  return (
    <div className={css.ratingCard}>
      <Link
        className={css.cardWrapper}
        to={`/user/${user.id}`}
        preventScrollReset
        unstable_viewTransition
      >
        <div className={css.cardHeader}>
          <span className={css.cardTitle} id={css.card_title}>
            {`${
              number + 1 === 1
                ? " 🥇"
                : number + 1 === 2
                ? " 🥈"
                : number + 1 === 3
                ? " 🥉"
                : number + 1
            }. `}
            {user.name}
          </span>

          <span className={css.cardRole}>{user.role}</span>
        </div>

        <div className={css.cardActions} id={css.card_actions}>
          <div className={css.cardActionsRow}>
            <div className={css.cardActionsCol}>
              <span>ДОБ:</span> {user.actions.added}
            </div>
            |
            <div className={css.cardActionsCol}>
              <span>ОБН:</span> {user.actions.updated}
            </div>
            |
            <div className={css.cardActionsCol}>
              <span>УДЛ:</span> {user.actions.deleted}
            </div>
          </div>

          <div className={css.cardActionsCol}>
            <span>ОЧКИ:</span>
            {Math.ceil(
              user.actions.added +
                user.actions.updated / 4 +
                user.actions.deleted / 2
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
