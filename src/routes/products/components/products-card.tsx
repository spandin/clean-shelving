import { Link } from "react-router-dom";

import { ProductType } from "@/types/types";

import { BsArrowDownLeftCircle } from "react-icons/bs";

import { timestampToString } from "@/lib/date";

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
            {number + 1}. {product.name}
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

        <div className="products__grid__card__row_3__group">
          <div id="card_badge">{product.category}</div>
          <div id="card_badge">
            {product.actions.exported.isExported ? "Внесён" : "Не внесён"}
          </div>
        </div>
      </div>
    </div>
  );
}
