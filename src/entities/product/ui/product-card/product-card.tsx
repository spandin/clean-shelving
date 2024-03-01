import css from "./_product-card.module.scss";

import { ProductType } from "@/shared/types/types";

import { motion } from "framer-motion";

import { BsArrowDownLeftCircle } from "react-icons/bs";
import {
  calcDistanceEndDayFromExp,
  timestampToString,
} from "@/shared/helpers/parse-date";
import CustomLink from "@/shared/ui/custom-link/custom-link";

interface Props {
  product: ProductType;
  number: number;
}

export function ProductCard({ product, number }: Props) {
  return (
    <motion.div
      key={number}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: number * 0.1 }}
      className={css.productCard}
    >
      <div className={css.cardRow_1}>
        <div className={css.cardRow_1_group}>
          <h4 id={css.card_name}>
            {product.actions.exported.isExported ? (
              <span className={css.card_name_exported}>
                {number + 1 + ". " + product.name}
              </span>
            ) : (
              <span className={css.card_name_notExported}>
                {number + 1 + ". " + product.name}
              </span>
            )}
          </h4>
          <span id={css.card_quantity}>{product.quantity} шт.</span>
        </div>

        <span id={css.card_barcode}>{product.code}</span>
      </div>

      <div className={css.cardRow_2}>
        <div id={css.card_add}>
          {product.actions.updated.updatedAt ? (
            <>
              <span>ОБН:</span>
              <span>
                {timestampToString(product.actions.updated.updatedAt)}
              </span>
            </>
          ) : (
            <>
              <span>ДОБ:</span>
              <span>{timestampToString(product.dates.createdAt)}</span>
            </>
          )}
        </div>
        <div id={css.card_mfd}>
          <span>ИЗГ:</span>
          <span>{timestampToString(product.dates.mfd)}</span>
        </div>
        <div id={css.card_exp}>
          <span>ИСТ:</span>
          <span>{timestampToString(product.dates.exp)}</span>
        </div>
      </div>

      <div className={css.cardRow_3}>
        <CustomLink id={css.card_link} to={`/products/${product.id}`}>
          <BsArrowDownLeftCircle />
          Подробнее
        </CustomLink>

        <div id={css.card_badge}>
          {calcDistanceEndDayFromExp(timestampToString(product.dates.exp))}
        </div>
      </div>
    </motion.div>
  );
}
