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
        <Link className="statistics-card__column" to={`/user/${user.id}`}>
          <div className="statistics-card__column__row">
            <span
              className="statistics-card__column__row__title"
              id="card_title"
            >
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
              {`Баллы: ${
                user.actions.added +
                user.actions.updated / 4 +
                user.actions.deleted / 2
              }`}
            </span>
          </div>

          <div className="statistics-card__column__description">
            <div className="statistics-card__column__description__actions">
              <div className="statistics-card__column__description__actions__col">
                <span>Добавлено:</span> {user.actions.added}
              </div>
              |
              <div className="statistics-card__column__description__actions__col">
                <span>Обновлено:</span> {user.actions.updated}{" "}
              </div>
              |
              <div className="statistics-card__column__description__actions__col">
                <span>Удалено:</span> {user.actions.deleted}{" "}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <Divider />
    </>
  );
}
