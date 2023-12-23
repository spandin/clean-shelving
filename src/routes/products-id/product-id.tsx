import "./_product-id.scss";
import { useParams } from "react-router-dom";

import { timestampToString } from "@/lib/date";

import { Ring } from "@uiball/loaders";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/hooks/redux-hooks";

export default function ProductId() {
  const { isDark } = useTheme();

  const { id } = useParams();

  const products = useAppSelector((state) => state.data.products);
  const product = products.find((post) => post.id === id);

  return (
    <div className="product-id">
      {product != undefined ? (
        <>
          <div className="product-id__wrapper">
            <div className="product-id__wrapper__header">
              <Informer title={`${product.name}`} subtitle={product.category} />

              <div className="product-id__wrapper__header__buttons">
                <button className="circle_button">
                  <BsPencilSquare />
                </button>
                <button className="circle_button">
                  <BsTrash3 />
                </button>
              </div>
            </div>

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
                  <span id="content_headline">Категория: </span>{" "}
                  {product.category}
                </div>
                <div>
                  <span id="content_headline">Статус: </span>
                  {product.actions.exported.isExported ? "Внесен" : "Не внесён"}
                </div>
              </div>

              <div className="product-id__wrapper__body__content">
                <h1>Даты:</h1>
                <div>
                  <span id="content_headline">Добавлен: </span>{" "}
                  {timestampToString(product.dates.createdAt)}
                </div>
                <div>
                  <span id="content_headline">Изготовлен: </span>{" "}
                  {timestampToString(product.dates.mfd)}
                </div>
                <div>
                  <span id="content_headline">Просрочится: </span>
                  {timestampToString(product.dates.exp)}
                </div>
              </div>
            </div>
          </div>

          <div className="product-id__footer">
            <button className="circle_button">
              <BsPencilSquare />
            </button>
            <button className="circle_button">
              <BsTrash3 />
            </button>
          </div>
        </>
      ) : (
        <Ring size={30} color={isDark ? "#ffffff" : "#121212"} />
      )}
    </div>
  );
}
