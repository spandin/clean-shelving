import { Link } from "react-router-dom";

import { AllActivity } from "@/types/types";

import { timestampToString } from "@/lib/date";

export default function ActivityCard({ activity }: { activity: AllActivity }) {
  return (
    <div className="activity-card">
      <Link
        to={`/user/${activity.actioner.id}`}
        className="activity-card__avatar"
      >
        {activity.actioner.name &&
          activity.actioner.name.charAt(0).toUpperCase()}
      </Link>
      <Link className="activity-card__column" to={`/products/${activity.id}`}>
        <div className="activity-card__column__row">
          <span className="activity-card__column__row__title">
            {activity.actioner.name}
          </span>
          <span className="activity-card__column__row__date">
            {timestampToString(activity.madeOn)}
          </span>
        </div>

        <span className="activity-card__column__description">
          {activity.description}
        </span>
      </Link>
    </div>
  );
}