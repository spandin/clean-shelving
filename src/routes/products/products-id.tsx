import "./_products-id.scss";

import ButtonBack from "../../components/common/button-back";

import { BsTrash3, BsPencilSquare } from "react-icons/bs";

export default function ProductsId() {
  return (
    <div className="products-id">
      <div className="products-id__wrapper">
        <div className="products-id__wrapper__header">
          <div className="products-id__wrapper__header__informer">
            <ButtonBack />
            <div className="products-id__wrapper__header__informer__col">
              <span>Nestle Decaration 75g</span>
              <span>Продукты</span>
            </div>
          </div>

          <div className="products-id__wrapper__header__buttons">
            <button>
              <BsPencilSquare />
            </button>
            <button>
              <BsTrash3 />
            </button>
          </div>
        </div>

        <div className="products-id__wrapper__body">
          <h1> Основная информация:</h1>
          <div>
            <span id="body_headline">Наименование: </span>Nestle Decaration 75g
          </div>
          <div>
            <span id="body_headline">Штрихкод: </span> 8001987664021
          </div>
          <div>
            <span id="body_headline">Категория: </span> Продукты
          </div>
          <div>
            <span id="body_headline">Статус: </span> Внесён
          </div>
        </div>

        <div className="products-id__wrapper__body">
          <h1>Даты:</h1>
          <div>
            <span id="body_headline">Добавлен: </span> 05.12.2023
          </div>
          <div>
            <span id="body_headline">Обновлён: </span> 08.12.2023
          </div>
          <div>
            <span id="body_headline">Изготовлен: </span> 21.02.2022
          </div>
          <div>
            <span id="body_headline">Просрочится: </span>
            21.02.2023
          </div>
        </div>
      </div>
      <div className="products-id__footer">
        <button>
          <BsPencilSquare />
        </button>
        <button>
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
}
