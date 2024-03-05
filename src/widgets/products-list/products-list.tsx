import css from "./_products-list.module.scss";

import { ProductType } from "@/shared/types/types";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { ProductCard } from "@/entities/product";
import productsFiltration from "../../features/products-list/lib/products-filtration";
import PulsarLoader from "@/shared/ui/pulsar-loader/pulsar-loader";

import IMAGES from "@/assets/images/images";

export function ProductsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setIsError] = useState(false);

  const [products, setProducts] = useState<ProductType[]>([]);
  const { exported, category } = useAppSelector((state) => state.data.filter);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, "data"),
        (querySnapshot) => {
          const collectionSnapshot: ProductType[] = [];

          querySnapshot.forEach((doc: DocumentData) => {
            collectionSnapshot.push(doc.data());
            collectionSnapshot.sort(
              (a, b) => +new Date(a.dates.exp) - +new Date(b.dates.exp)
            );
          });

          if (collectionSnapshot.length === 0) {
            setIsLoading(false);
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setIsLoading(false);

            setProducts(collectionSnapshot);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("PRODUCTS LIST: " + error);
      setIsError(true);
    }
  }, []);

  if (isError) {
    return <div className={css.isState}>Ошибка загрузки</div>;
  }

  if (isLoading) {
    return (
      <div className={css.isState}>
        <PulsarLoader size={20} />
        Загрузка списка
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={css.isState}>
        <img src={IMAGES.empty_products} />
        На данный момент тут пусто!
      </div>
    );
  }

  return (
    <div className={css.productsList}>
      {productsFiltration(products, category, exported).map(
        (product, index) => (
          <ProductCard key={product.id} product={product} number={index} />
        )
      )}
    </div>
  );
}
