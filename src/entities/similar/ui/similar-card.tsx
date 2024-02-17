import css from "./_similar-card.module.scss";

import { ProductType } from "@/shared/types/types";

import { Link } from "react-router-dom";

import { timestampToString } from "@/shared/helpers/parse-date";

export function SimilarCard({ item }: { item: ProductType }) {
  const navigation = useNavigate();

  return (
    <Link
      key={item.id}
      className={css.similarCard}
      to={`/products/${item.id}`}
      onTouchStart={() =>
        navigation(`/products/${item.id}`, {
          unstable_viewTransition: true,
        })
      }
      preventScrollReset
      unstable_viewTransition
    >
      <div className={css.cardRow_1}>
        <div className={css.cardRow_1_group}>
          {item.actions.exported.isExported ? (
            <span className={css.card_name_exported}>{item.code}</span>
          ) : (
            <span className={css.card_name_notExported}>{item.code}</span>
          )}

          <span id={css.card_quantity}>{item.quantity} шт.</span>
        </div>

        <span id={css.card_barcode}></span>
      </div>

      <div className={css.cardRow_2}>
        <div id={css.card_add}>
          {item.actions.updated.updatedAt ? (
            <>
              <span>ОБН:</span>
              <span>{timestampToString(item.actions.updated.updatedAt)}</span>
            </>
          ) : (
            <>
              <span>ДОБ:</span>
              <span>{timestampToString(item.dates.createdAt)}</span>
            </>
          )}
        </div>
        <div id={css.card_mfd}>
          <span>ИСТ:</span>
          <span>{timestampToString(item.dates.mfd)}</span>
        </div>
        <div id={css.card_exp}>
          <span>ИСТ:</span>
          <span>{timestampToString(item.dates.exp)}</span>
        </div>
      </div>
    </Link>
  );
}
