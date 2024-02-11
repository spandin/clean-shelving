import css from "./_productCard.module.scss";

import { ProductType } from "@/types/types";

import { Link } from "react-router-dom";

import { BsArrowDownLeftCircle } from "react-icons/bs";
import {
  calcDistanceEndDayFromExp,
  timestampToString,
} from "@/shared/helpers/parse-date";

interface Props {
  product: ProductType;
  number: number;
}

export default function ProductCard({ product, number }: Props) {
  return (
    <div className={css.productCard}>
      <div className={css.cardRow_1}>
        <div className={css.cardRow_1_group}>
          <span id={css.card_name}>
            {product.actions.exported.isExported ? (
              <div className={css.card_name_exported}>
                {number + 1 + ". " + product.name}
              </div>
            ) : (
              <div className={css.card_name_notExported}>
                {number + 1 + ". " + product.name}
              </div>
            )}
          </span>
          <span id={css.card_quantity}>{product.quantity} шт.</span>
        </div>

        <span id={css.card_barcode}>{product.code}</span>
      </div>

      <div className={css.cardRow_2}>
        <div id={css.card_add}>
          {product.actions.updated.updatedAt ? (
            <>
              <span>UPD:</span>
              <span>
                {timestampToString(product.actions.updated.updatedAt)}
              </span>
            </>
          ) : (
            <>
              <span>ADD:</span>
              <span>{timestampToString(product.dates.createdAt)}</span>
            </>
          )}
        </div>
        <div id={css.card_mfd}>
          <span>MFD:</span>
          <span>{timestampToString(product.dates.mfd)}</span>
        </div>
        <div id={css.card_exp}>
          <span>EXP:</span>
          <span>{timestampToString(product.dates.exp)}</span>
        </div>
      </div>

      <div className={css.cardRow_3}>
        <Link
          id={css.card_link}
          to={`/products/${product.id}`}
          preventScrollReset
          unstable_viewTransition
        >
          <BsArrowDownLeftCircle />
          Подробнее
        </Link>

        <div id={css.card_badge}>
          {calcDistanceEndDayFromExp(timestampToString(product.dates.exp))}
        </div>
      </div>
    </div>
  );
}
