import css from "./_similar-products.module.scss";

import { ProductType } from "@/types/types";

import { Link } from "react-router-dom";

import { timestampToString } from "@/shared/helpers/parse-date";

export function SimilarProducts({ items }: { items: ProductType[] }) {
  return (
    <div className={css.similarProducts}>
      <h3>Схожие продукты</h3>

      {items.map((item) => {
        return (
          <Link
            key={item.id}
            className={css.similarCard}
            to={`/products/${item.id}`}
            preventScrollReset
            unstable_viewTransition
          >
            <div className={css.cardRow_1}>
              <div className={css.cardRow_1_group}>
                <span id={css.card_name}>
                  {item.actions.exported.isExported ? (
                    <div className={css.card_name_exported}>{item.code}</div>
                  ) : (
                    <div className={css.card_name_notExported}>{item.code}</div>
                  )}
                </span>
                <span id={css.card_quantity}>{item.quantity} шт.</span>
              </div>

              <span id={css.card_barcode}></span>
            </div>

            <div className={css.cardRow_2}>
              <div id={css.card_add}>
                {item.actions.updated.updatedAt ? (
                  <>
                    <span>UPD:</span>
                    <span>
                      {timestampToString(item.actions.updated.updatedAt)}
                    </span>
                  </>
                ) : (
                  <>
                    <span>ADD:</span>
                    <span>{timestampToString(item.dates.createdAt)}</span>
                  </>
                )}
              </div>
              <div id={css.card_mfd}>
                <span>MFD:</span>
                <span>{timestampToString(item.dates.mfd)}</span>
              </div>
              <div id={css.card_exp}>
                <span>EXP:</span>
                <span>{timestampToString(item.dates.exp)}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
