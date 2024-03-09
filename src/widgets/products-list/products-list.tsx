import css from "./_products-list.module.scss";

import { ProductType } from "@/shared/types/types";

import { useEffect, useState } from "react";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { filtrationSwitch } from "@/features/filter-products";
import { ProductCard } from "@/entities/product";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";
import { useTheme } from "@/shared/lib/hooks/use-theme";
import PulsarLoader from "@/shared/ui/pulsar-loader/pulsar-loader";

import { IMAGES_LIGHT, IMAGES_DARK } from "@/assets";

export function ProductsList() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setIsError] = useState(false);

  const [products, setProducts] = useState<ProductType[]>([]);
  const { exported, category } = useAppSelector((state) => state.data.filter);

  useEffect(() => {
    const getData = onSnapshot(collection(db, "data"), (querySnapshot) => {
      try {
        const collectionSnapshot: ProductType[] = [];

        querySnapshot.forEach((doc: DocumentData) => {
          collectionSnapshot.push(doc.data());
          collectionSnapshot.sort(
            (a, b) => +new Date(a.dates.exp) - +new Date(b.dates.exp)
          );
        });

        if (collectionSnapshot.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setProducts(collectionSnapshot);
        }
      } catch (error) {
        console.error("PRODUCTS LIST: " + error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      getData();
    };
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
        <img
          src={
            isDark ? IMAGES_DARK.empty_products_d : IMAGES_LIGHT.empty_products
          }
        />
        На данный момент тут пусто!
      </div>
    );
  }

  return (
    <div className={css.productsList}>
      {filtrationSwitch(products, category, exported).map((product, index) => (
        <ProductCard key={product.id} product={product} number={index} />
      ))}
    </div>
  );
}
