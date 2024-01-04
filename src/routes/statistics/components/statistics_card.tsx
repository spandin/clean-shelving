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
      <div className="statistics-card__avatar">
        {user && number + 1 === 1 ? "🏆" : number + 1}
      </div>
      <Link className="statistics-card__column" to={`/user/${user.id}`}>
        <div className="statistics-card__column__row">
          <span className="statistics-card__column__row__title" id="card_title">
            {user.name}
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
  );
}
