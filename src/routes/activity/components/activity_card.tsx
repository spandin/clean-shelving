import { Link } from "react-router-dom";

import { Activity } from "@/types/types";

import { timestampToString } from "@/lib/date";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="activity-card">
      <Link
        className="activity-card__column"
        to={`/products/${activity.id}`}
        preventScrollReset
        unstable_viewTransition
      >
        <div className="activity-card__column__row">
          <span className="activity-card__column__row__title" id="card_title">
            {activity.actioner.name}
          </span>
          <span className="activity-card__column__row__date">
            {timestampToString(activity.madeOn)}
          </span>
        </div>

        <span
          className="activity-card__column__description"
          id="card_description"
        >
          {activity.description}
        </span>
      </Link>
    </div>
  );
}
