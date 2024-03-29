import css from "./_rating-card.module.scss";

import { UserData } from "@/shared/types/types";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function RatingCard({
  user,
  number,
}: {
  user: UserData;
  number: number;
}) {
  return (
    <motion.div
      key={number}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: number * 0.1 }}
      className={css.ratingCard}
    >
      <div className={css.cardWrapper}>
        <div className={css.cardHeader}>
          <Link to={`/user/${user.id}`}>
            <h4 className={css.cardTitle} id={css.card_title}>
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
            </h4>
          </Link>

          <span className={css.cardRole} id={css.card_role}>
            {user.role}
          </span>
        </div>

        <div className={css.cardActions} id={css.card_actions}>
          <div className={css.cardActionsRow}>
            <div className={css.cardActionsCol}>
              <span>ДОБ:</span> {user.actions.added}
            </div>
            |
            <div className={css.cardActionsCol}>
              <span>ОБН:</span> {user.actions.updated}
            </div>
            |
            <div className={css.cardActionsCol}>
              <span>УДЛ:</span> {user.actions.deleted}
            </div>
          </div>

          <div className={css.cardActionsCol}>
            <span>ОЧКИ:</span>
            {Math.ceil(
              user.actions.added +
                user.actions.updated / 4 +
                user.actions.deleted / 2
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
