export default function ProductBody() {
  return (
    <div className="product-id__wrapper__body">
      <div className="product-id__wrapper__body__content">
        <h1> Основная информация:</h1>
        <div>
          <span id="content_headline">Наименование: </span>Nestle Decaration 75g
        </div>
        <div>
          <span id="content_headline">Штрихкод: </span> 8001987664021
        </div>
        <div>
          <span id="content_headline">Категория: </span> Продукты
        </div>
        <div>
          <span id="content_headline">Статус: </span> Внесён
        </div>
      </div>

      <div className="product-id__wrapper__body__content">
        <h1>Даты:</h1>
        <div>
          <span id="content_headline">Добавлен: </span> 05.12.2023
        </div>
        <div>
          <span id="content_headline">Обновлён: </span> 08.12.2023
        </div>
        <div>
          <span id="content_headline">Изготовлен: </span> 21.02.2022
        </div>
        <div>
          <span id="content_headline">Просрочится: </span>
          21.02.2023
        </div>
      </div>
    </div>
  );
}
