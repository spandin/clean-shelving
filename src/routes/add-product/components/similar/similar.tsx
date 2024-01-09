import "./_similar.scss";

import { Link } from "react-router-dom";

import { timestampToString } from "@/lib/date";

import { ProductType } from "@/types/types";

export default function Similar({ items }: { items: ProductType[] }) {
  return (
    <div className="similar">
      <h3>Схожие продукты</h3>

      {items.map((item) => {
        return (
          <Link to={`/products/${item.id}`} className="products__grid__card">
            <div className="products__grid__card__row_1">
              <div className="products__grid__card__row_1__group">
                <span id="card_name">
                  {item.actions.exported.isExported ? (
                    <div className="card_name__exported">{item.code}</div>
                  ) : (
                    <div className="card_name__notExported">{item.code}</div>
                  )}
                </span>
                <span id="card_quantity">{item.quantity} шт.</span>
              </div>

              <span id="card_barcode"></span>
            </div>

            <div className="products__grid__card__row_2">
              <div id="card_add">
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
              <div id="card_mfd">
                <span>MFD:</span>
                <span>{timestampToString(item.dates.mfd)}</span>
              </div>
              <div id="card_exp">
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
