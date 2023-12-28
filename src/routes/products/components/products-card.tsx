import { Link } from "react-router-dom";

import { ProductType } from "@/types/types";

import { BsArrowDownLeftCircle } from "react-icons/bs";

import { calcDistanceEndFromExp, timestampToString } from "@/lib/date";

interface IProps {
  product: ProductType;
  number: number;
}

export default function ProductsCard({ product, number }: IProps) {
  return (
    <div className="products__grid__card">
      <div className="products__grid__card__row_1">
        <div className="products__grid__card__row_1__group">
          <span id="card_name">
            {product.actions.exported.isExported ? (
              <div className="card_name__exported">
                {number + 1 + ". " + product.name}
              </div>
            ) : (
              <div className="card_name__notExported">
                {number + 1 + ". " + product.name}
              </div>
            )}
          </span>
          <span id="card_quantity">{product.quantity} шт.</span>
        </div>

        <span id="card_barcode">{product.code}</span>
      </div>

      <div className="products__grid__card__row_2">
        <div id="card_add">
          {product.dates.createdAt ? (
            <>
              <span>ADD:</span>
              <span>{timestampToString(product.dates.createdAt)}</span>
            </>
          ) : (
            <>
              <span>UPD:</span>
              <span>
                {timestampToString(product.actions.updated.updatedAt)}
              </span>
            </>
          )}
        </div>
        <div id="card_mfd">
          <span>MFD:</span>
          <span>{timestampToString(product.dates.mfd)}</span>
        </div>
        <div id="card_exp">
          <span>EXP:</span>
          <span>{timestampToString(product.dates.exp)}</span>
        </div>
      </div>

      <div className="products__grid__card__row_3">
        <Link id="card_link" to={`/products/${product.id}`}>
          <BsArrowDownLeftCircle />
          Подробнее
        </Link>

        <div id="card_badge">
          {calcDistanceEndFromExp(timestampToString(product.dates.exp))}
        </div>
      </div>
    </div>
  );
}
