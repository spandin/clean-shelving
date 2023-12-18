import { Link } from "react-router-dom";

import { Timestamp } from "firebase/firestore";
import { ProductType } from "@/types/types";

import { BsArrowDownLeftCircle } from "react-icons/bs";

interface IProps {
  product: ProductType;
}

export default function ProductsCard({ product }: IProps) {
  const convetTimestampToString = (timestamp: Timestamp): string => {
    const date: Date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("ru-Ru");
  };

  return (
    <div className="products__grid__card">
      <div className="products__grid__card__row_1">
        <div className="products__grid__card__row_1__group">
          <span id="card_name">{product.name}</span>
          <span id="card_quantity">{product.quantity} шт.</span>
        </div>
        <span id="card_barcode">{product.code}</span>
      </div>

      <div className="products__grid__card__row_2">
        <div id="card_add">
          <span>ADD:</span>
          <span>{convetTimestampToString(product.dates.createdAt)}</span>
        </div>
        <div id="card_mfd">
          <span>MFD:</span>
          <span>{convetTimestampToString(product.dates.mfd)}</span>
        </div>
        <div id="card_exp">
          <span>EXP:</span>
          <span>{convetTimestampToString(product.dates.exp)}</span>
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
            {product.actions[2].isExported ? "Внесён" : "Не внесён"}
          </div>
        </div>
      </div>
    </div>
  );
}
