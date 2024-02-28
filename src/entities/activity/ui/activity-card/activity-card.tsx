import css from "./_activity-card.module.scss";

import { Activity } from "@/shared/types/types";

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
      <div className={css.cardColumn}>
        <div className={css.cardRow}>
          <h4 className={css.cardTitle} id={css.card_title}>
            {activity.actioner.name}
          </h4>
          <span className={css.cardDate} id={css.card_date}>
            {timestampToString(activity.madeOn)}
          </span>
        </div>

        <span className={css.cardDescription} id={css.card_description}>
          {activity.description}
        </span>
      </div>
    </motion.div>
  );
}
