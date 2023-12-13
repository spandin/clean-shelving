import { Link } from "react-router-dom";

import { ProductType } from "@/types/types";

import { BsArrowDownLeftCircle } from "react-icons/bs";

interface IProps {
  product: ProductType;
}

export default function ProductsCard({ product }: IProps) {
  return (
    <div className="products__grid__card">
      <div className="products__grid__card__row_1">
        <div>
          <span id="card_name">{product.name}</span>
          <span id="card_quantity">{product.quantity} шт.</span>
        </div>
        <span id="card_barcode">{product.code}</span>
      </div>

      <div className="products__grid__card__row_2">
        <div id="card_add">
          <span>ADD:</span>
          <span>{product.dateAdded}</span>
        </div>
        <div id="card_mfd">
          <span>MFD:</span>
          <span>{product.date_1}</span>
        </div>
        <div id="card_exp">
          <span>EXP:</span>
          <span>{product.date_2}</span>
        </div>
      </div>

      <div className="products__grid__card__row_3">
        <Link id="card_link" to={`/products/${product.id}`}>
          <BsArrowDownLeftCircle />
          Подробнее
        </Link>

        <div className="products__grid__card__row_3__group">
          <div id="card_badge">
            <span>{product.category}</span>
          </div>
          <div id="card_badge">
            <span>{product.isExported ? "Внесён" : "Не вснесён"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
