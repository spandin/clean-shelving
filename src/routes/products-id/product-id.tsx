import "./_product-id.scss";
import { ProductType } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "@/lib/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import { convetTimestampToString } from "@/lib/date";

import { Ring } from "@uiball/loaders";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";

export default function ProductId() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductType | DocumentData>();

  useEffect(() => {
    const docRef = doc(db, "data", `${productId}`);

    const fetchProductData = async () => {
      setIsLoading(false);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());

          setProduct(docSnap.data());
          setIsLoading(true);
        } else {
          console.log(`Document does not exist`);
        }
      } catch (error) {
        console.log("ProductID: " + error);
      }
    };

    return () => {
      fetchProductData();
    };
  }, [productId]);

  return (
    <div className="product-id">
      {isLoading && product != undefined ? (
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
        <Ring size={30} color={theme.matches ? "#ffffff" : "#121212"} />
      )}
    </div>
  );
}
