import css from "./_products-list.module.scss";

import { ProductType } from "@/types/types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/shared/hooks/use-theme";
import { useAppSelector } from "@/shared/hooks/redux-hooks";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { Ring } from "@uiball/loaders";
import { BsPlusCircle } from "react-icons/bs";

import productsFiltration from "../../lib/products-filtration";
import Informer from "@/shared/ui/informer/informer";
import { ProductsListLayout } from "../../ui/products-list-layout/products-list-layout";
import { ProductCard } from "../../ui/product-card/product-card";
import FilterButton from "../../ui/products-filter/filter-button";

export function ProductsList() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductType[]>([]);
  const { exported, category } = useAppSelector((state) => state.data.filter);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "data"), (querySnapshot) => {
      const collectionSnapshot: ProductType[] = [];

      querySnapshot.forEach((doc: DocumentData) => {
        collectionSnapshot.push(doc.data());
        collectionSnapshot.sort(
          (a, b) => +new Date(a.dates.exp) - +new Date(b.dates.exp)
        );
      });

      setProducts(collectionSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ProductsListLayout>
      <div className={css.listHeader}>
        <Informer
          title={`${category} ${
            exported === "Все" ? "🙌" : exported === true ? "👍" : "👎"
          } `}
          subtitle={`${
            productsFiltration(products, category, exported).length
          } позиций`}
        />

        <div className={css.listHeaderButtons}>
          <button
            className="circle_button"
            onClick={() => navigate("/add/", { unstable_viewTransition: true })}
          >
            <BsPlusCircle />
          </button>

          <FilterButton />
        </div>
      </div>

      <div className={css.listGrid}>
        {products && products.length ? (
          productsFiltration(products, category, exported).map(
            (product, number) => (
              <ProductCard key={product.id} product={product} number={number} />
            )
          )
        ) : (
          <Ring size={30} color={isDark ? "#ffffff" : "#121212"} />
        )}
      </div>
    </ProductsListLayout>
  );
}
