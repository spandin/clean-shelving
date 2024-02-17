import css from "./_activity-card.module.scss";

import { Activity } from "@/shared/types/types";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { timestampToString } from "@/shared/helpers/parse-date";

export function ActivityCard({
  activity,
  number,
}: {
  activity: Activity;
  number: number;
}) {
  const navigation = useNavigate();

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
        onTouchStart={() =>
          navigation(`/products/${activity.id}`, {
            unstable_viewTransition: true,
          })
        }
        preventScrollReset
        unstable_viewTransition
      >
        <div className={css.cardRow}>
          <h4 className={css.cardTitle} id={css.card_title}>
            {activity.actioner.name}
          </h4>
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
