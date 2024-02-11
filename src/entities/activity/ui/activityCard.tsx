import css from "./_activityCard.module.scss";

import { Activity } from "@/types/types";

import { Link } from "react-router-dom";

import { timestampToString } from "@/shared/helpers/parse-date";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className={css.activityCard}>
      <Link
        className={css.cardColumn}
        to={`/products/${activity.id}`}
        preventScrollReset
        unstable_viewTransition
      >
        <div className={css.cardRow}>
          <span className={css.cardTitle} id={css.card_title}>
            {activity.actioner.name}
          </span>
          <span className={css.cardDate}>
            {timestampToString(activity.madeOn)}
          </span>
        </div>

        <span className={css.cardDescription} id={css.card_description}>
          {activity.description}
        </span>
      </Link>
    </div>
  );
}
