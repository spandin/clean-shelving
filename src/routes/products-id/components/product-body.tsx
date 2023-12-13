import { ProductType } from "@/types/types";

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
          <span id="content_headline">Статус: </span>{" "}
          {product.isExported ? "Внесен" : "Не внесён"}
        </div>
      </div>

      <div className="product-id__wrapper__body__content">
        <h1>Даты:</h1>
        <div>
          <span id="content_headline">Добавлен: </span> {product.dateAdded}
        </div>
        <div>
          <span id="content_headline">Изготовлен: </span> {product.date_1}
        </div>
        <div>
          <span id="content_headline">Просрочится: </span>
          {product.date_2}
        </div>
      </div>
    </div>
  );
}
