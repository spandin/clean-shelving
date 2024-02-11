import "./_product-id.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTheme } from "@/shared/hooks/use-theme";
import { useAppSelector } from "@/shared/hooks/redux-hooks";

import { Ring } from "@uiball/loaders";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import { timestampToString } from "@/shared/helpers/parse-date";

import { UpdateProduct } from "@/features/product/update-product/ui/updateProduct";
import { DeleteProduct } from "@/features/product/delete-product/ui/deleteProduct";
import { Modal } from "@/shared/ui/modal/modal";
import Informer from "@/shared/ui/informer/informer";

export default function ProductPage() {
  const { productId } = useParams();
  const { isDark } = useTheme();

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);

  const products = useAppSelector((state) => state.data.products);
  const product = products.find((post) => post.id === productId);

  return (
    <div className="product-id">
      {product != undefined && productId != undefined ? (
        <>
          <div className="product-id__wrapper">
            <div className="product-id__wrapper__header">
              <Informer title={`${product.name}`} subtitle={product.category} />

              <div className="product-id__wrapper__header__buttons">
                <button
                  className="circle_button"
                  onClick={() => setUpdateModalActive(true)}
                >
                  <BsPencilSquare />
                </button>

                <button
                  className="circle_button"
                  onClick={() => setDeleteModalActive(true)}
                >
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
                  {product.dates.createdAt ? (
                    <span id="content_headline">
                      Добавлен: {timestampToString(product.dates.createdAt)}
                    </span>
                  ) : (
                    <span id="content_headline">
                      Обновлён:{" "}
                      {timestampToString(product.actions.updated.updatedAt)}
                    </span>
                  )}
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
            <button
              className="circle_button"
              onClick={() => setUpdateModalActive(true)}
            >
              <BsPencilSquare />
            </button>

            <button
              className="circle_button"
              onClick={() => setDeleteModalActive(true)}
            >
              <BsTrash3 />
            </button>
          </div>

          <Modal active={updateModalActive} setActive={setUpdateModalActive}>
            <UpdateProduct product={product} id={productId} />
          </Modal>

          <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
            <DeleteProduct name={product.name} id={productId} />
          </Modal>
        </>
      ) : (
        <Ring size={30} color={isDark ? "#ffffff" : "#121212"} />
      )}
    </div>
  );
}
