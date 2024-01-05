import { Link } from "react-router-dom";

import { UserData } from "@/types/types";

import Divider from "@/components/common/divider/divider";

export default function StatisticsCard({
  user,
  number,
}: {
  user: UserData;
  number: number;
}) {
  return (
    <>
      <div className="statistics-card">
        <div className="statistics-card__avatar">
          {user && user.name.charAt(0).toUpperCase()}
        </div>
        <Link className="statistics-card__column" to={`/user/${user.id}`}>
          <div className="statistics-card__column__row">
            <span
              className="statistics-card__column__row__title"
              id="card_title"
            >
              {user.name}
              {number + 1 === 1
                ? " 🥇"
                : number + 1 === 2
                ? " 🥈"
                : number + 1 === 3
                ? " 🥉"
                : null}
            </span>
            <span className="statistics-card__column__row__role">
              {user.role}
            </span>
          </div>

          <span className="statistics-card__column__description">
            {`Очков: ${
              user.actions.added + user.actions.updated + user.actions.deleted
            }`}
          </span>
        </Link>
      </div>
      <Divider />
    </>
  );
}
