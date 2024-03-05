import css from "./_product-details.module.scss";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import { UpdateProduct } from "@/features/update-product/ui/update-product";
import { DeleteProduct } from "@/features/delete-product/ui/delete-products";
import { useAppSelector } from "@/shared/lib/hooks/use-redux";
import { timestampToString } from "@/shared/helpers/parse-date";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { Modal } from "@/shared/ui/modal/modal";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";
import RingLoader from "@/shared/ui/pulsar-loader/pulsar-loader";

export default function ProductDetails() {
  const { productId } = useParams();

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);

  const products = useAppSelector((state) => state.data.products);
  const product = products.find((post) => post.id === productId);

  return (
    <div className={css.productDetails}>
      {product != undefined && productId != undefined ? (
        <>
          <div className={css.detailsWrapper}>
            <div className={css.detailsHeader}>
              <HeaderInformer
                title={`${product.name}`}
                subtitle={product.category}
              />

              <div className={css.headerButton}>
                <ActionButton
                  className="circle_button"
                  action={() => setUpdateModalActive(true)}
                >
                  <BsPencilSquare />
                </ActionButton>

                <ActionButton
                  className="circle_button"
                  action={() => setDeleteModalActive(true)}
                >
                  <BsTrash3 />
                </ActionButton>
              </div>
            </div>

            <div className={css.detailsBody}>
              <div className={css.bodyContent}>
                <h1> Основная информация:</h1>
                <div>
                  <span id={css.content_headline}>Наименование: </span>
                  {product.name}
                </div>
                <div>
                  <span id={css.content_headline}>Штрихкод: </span>{" "}
                  {product.code}
                </div>
                <div>
                  <span id={css.content_headline}>Категория: </span>{" "}
                  {product.category}
                </div>
                <div>
                  <span id={css.content_headline}>Статус: </span>
                  {product.actions.exported.isExported ? "Внесен" : "Не внесён"}
                </div>
              </div>

              <div className={css.bodyContent}>
                <h1>Даты:</h1>
                <div>
                  {product.dates.createdAt ? (
                    <span id={css.content_headline}>
                      Добавлен: {timestampToString(product.dates.createdAt)}
                    </span>
                  ) : (
                    <span id={css.content_headline}>
                      Обновлён:{" "}
                      {timestampToString(product.actions.updated.updatedAt)}
                    </span>
                  )}
                </div>
                <div>
                  <span id={css.content_headline}>Изготовлен: </span>{" "}
                  {timestampToString(product.dates.mfd)}
                </div>
                <div>
                  <span id={css.content_headline}>Просрочится: </span>
                  {timestampToString(product.dates.exp)}
                </div>
              </div>
            </div>
          </div>

          <div className={css.detailsFooter}>
            <ActionButton action={() => setUpdateModalActive(true)}>
              Обновить
            </ActionButton>

            <ActionButton action={() => setDeleteModalActive(true)}>
              Удалить
            </ActionButton>
          </div>

          <Modal active={updateModalActive} setActive={setUpdateModalActive}>
            <UpdateProduct product={product} id={productId} />
          </Modal>

          <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
            <DeleteProduct name={product.name} id={productId} />
          </Modal>
        </>
      ) : (
        <RingLoader size={30} />
      )}
    </div>
  );
}
