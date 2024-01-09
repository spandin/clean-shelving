import { Link } from "react-router-dom";

import { UserData } from "@/types/types";

export default function StatisticsCard({
  user,
  number,
}: {
  user: UserData;
  number: number;
}) {
  return (
    <div className="statistics-card">
      <Link
        className="statistics-card__column"
        to={`/user/${user.id}`}
        preventScrollReset
        unstable_viewTransition
      >
        <div className="statistics-card__column__row">
          <span className="statistics-card__column__row__title" id="card_title">
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

          <span className="statistics-card__column__row__role">
            {user.role}
          </span>
        </div>

        <div className="statistics-card__column__actions" id="card_actions">
          <div className="statistics-card__column__actions__row">
            <div className="statistics-card__column__actions__row__col">
              <span>ADD:</span> {user.actions.added}
            </div>
            |
            <div className="statistics-card__column__actions__row__col">
              <span>UPD:</span> {user.actions.updated}
            </div>
            |
            <div className="statistics-card__column__actions__row__col">
              <span>DEL:</span> {user.actions.deleted}
            </div>
          </div>

          <div className="statistics-card__column__actions__col">
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
