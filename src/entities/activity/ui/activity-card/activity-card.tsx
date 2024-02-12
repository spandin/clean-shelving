import css from "./_activity-card.module.scss";

import { Activity } from "@/shared/types/types";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { timestampToString } from "@/shared/helpers/parse-date";

export function ActivityCard({
  activity,
  number,
}: {
  activity: Activity;
  number: number;
}) {
  return (
    <motion.div
      key={number}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className={css.activityCard}
    >
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
    </motion.div>
  );
}
