import "./_product-id.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "@/lib/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import { timestampToString } from "@/lib/date";

import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";

interface IProduct {
  id: string;
  name: string;
  code: number;
  category: string;
  quantity: number;
  dates: {
    createdAt: number;
    mfd: number;
    exp: number;
  };
  actions: {
    created: {
      createdAt: number;
      whoCreated: string;
      whoCreatedID?: string;
    };
    updated: {
      updatedAt: number;
      whoUpdated: string;
      whoUpdatedID?: string;
    };
    exported: {
      exportedOn: number;
      isExported: boolean;
      whoExported: string;
      whoExportedID?: string;
    };
  };
}

export default function ProductId() {
  const { productId } = useParams();

  const [product, setProduct] = useState<DocumentData | IProduct>();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "data", `${productId}`);
        console.log(docRef);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap);

          setProduct(docSnap.data());
        } else {
          console.log(`Document does not exist`);
        }
      } catch (error) {
        console.log("ProductID: " + error);
      }
    };

    console.log(product);

    return () => {
      fetchProductData();
    };
  }, [productId]);

  return (
    <div className="product-id">
      <div className="product-id__wrapper">
        <div className="product-id__wrapper__header">
          <Informer title={`${product?.name}`} subtitle={product?.name} />

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
              {product?.name}
            </div>
            <div>
              <span id="content_headline">Штрихкод: </span> {product?.code}
            </div>
            <div>
              <span id="content_headline">Категория: </span> {product?.category}
            </div>
            <div>
              <span id="content_headline">Статус: </span>
              {product?.actions.exported.isExported ? "Внесен" : "Не внесён"}
            </div>
          </div>

          <div className="product-id__wrapper__body__content">
            <h1>Даты:</h1>
            <div>
              <span id="content_headline">Добавлен: </span>{" "}
              {timestampToString(product?.dates.createdAt)}
            </div>
            <div>
              <span id="content_headline">Изготовлен: </span>{" "}
              {timestampToString(product?.dates.mfd)}
            </div>
            <div>
              <span id="content_headline">Просрочится: </span>
              {timestampToString(product?.dates.exp)}
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
    </div>
  );
}
