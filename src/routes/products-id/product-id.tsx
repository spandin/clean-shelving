import "./_product-id.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/hooks/redux-hooks";

import { toastAuthErr } from "@/lib/toast";

import { Ring } from "@uiball/loaders";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";
import { UpdateProduct } from "@/components/products/update-product/update-product";
import { DeleteProduct } from "@/components/products/delete-product/delete-product";
import { Modal } from "@/components/common/modal/modal";

export default function ProductId() {
  const { productId } = useParams();
  const { isDark } = useTheme();
  const { isAuth } = useAuth();

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
                  onClick={
                    isAuth ? () => setUpdateModalActive(true) : toastAuthErr
                  }
                >
                  <BsPencilSquare />
                </button>

                <button
                  className="circle_button"
                  onClick={
                    isAuth ? () => setDeleteModalActive(true) : toastAuthErr
                  }
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
                  <span id="content_headline">Добавлен: </span>{" "}
                  {product.dates.createdAt}
                </div>
                <div>
                  <span id="content_headline">Изготовлен: </span>{" "}
                  {product.dates.mfd}
                </div>
                <div>
                  <span id="content_headline">Просрочится: </span>
                  {product.dates.exp}
                </div>
              </div>
            </div>
          </div>

          <div className="product-id__footer">
            <button
              className="circle_button"
              onClick={isAuth ? () => setUpdateModalActive(true) : toastAuthErr}
            >
              <BsPencilSquare />
            </button>

            <button
              className="circle_button"
              onClick={isAuth ? () => setDeleteModalActive(true) : toastAuthErr}
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
