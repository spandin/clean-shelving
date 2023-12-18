import { ProductType } from "@/types/types";

import { convetTimestampToString } from "@/lib/date";

interface IProps {
  product: ProductType;
}

export default function ProductBody({ product }: IProps) {
  return (
    <div className="product-id__wrapper__body">
      <div className="product-id__wrapper__body__content">
        <h1> Основная информация:</h1>
        <div>
          <span id="content_headline">Наименование: </span>
          {product.name}
        </div>
        <div>
          <span id="content_headline">Штрихкод: </span> {product.code}
        </div>
        <div>
          <span id="content_headline">Категория: </span> {product.category}
        </div>
        <div>
          <span id="content_headline">Статус: </span>
          {product.actions[2].isExported ? "Внесен" : "Не внесён"}
        </div>
      </div>

      <div className="product-id__wrapper__body__content">
        <h1>Даты:</h1>
        <div>
          <span id="content_headline">Добавлен: </span>{" "}
          {convetTimestampToString(product.dates.createdAt)}
        </div>
        <div>
          <span id="content_headline">Изготовлен: </span>{" "}
          {convetTimestampToString(product.dates.mfd)}
        </div>
        <div>
          <span id="content_headline">Просрочится: </span>
          {convetTimestampToString(product.dates.exp)}
        </div>
      </div>
    </div>
  );
}
