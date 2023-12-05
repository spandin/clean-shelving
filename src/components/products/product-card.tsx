import React from "react";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProductCard() {
  return (
    <div className="products__grid__card">
      <div className="products__grid__card__row_1">
        <div>
          <span id="card_name">Nestle Decoration 75g</span>
          <span id="card_quantity">14 шт.</span>
        </div>
        <span id="card_barcode">8001987664021</span>
      </div>

      <div className="products__grid__card__row_2">
        <div id="card_add">
          <span>ADD:</span>
          <span>01.12.2023</span>
        </div>
        <div id="card_mfd">
          <span>MFD:</span>
          <span>01.12.2023</span>
        </div>
        <div id="card_exp">
          <span>EXP:</span>
          <span>01.12.2023</span>
        </div>
      </div>

      <div className="products__grid__card__row_3">
        <Link id="card_link" to="productId">
          <BsArrowDownLeftCircle />
          Подробнее
        </Link>

        <div className="products__grid__card__row_3__group">
          <div id="card_badge">
            <span>Продукты</span>
          </div>
          <div id="card_badge">
            <span>Внесён</span>
          </div>
        </div>
      </div>
    </div>
  );
}
