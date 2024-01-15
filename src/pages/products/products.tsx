import "./_products.scss";
import { useEffect, useState } from "react";

import { ProductType } from "@/types/types";

import { useTheme } from "@/shared/hooks/use-theme";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";

import { getActivity, getBarcodes, getProducts } from "@/app/slices/dataSlice";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { Ring } from "@uiball/loaders";

import ProductsCard from "./components/products-card";
import ProductsHeader from "./components/products-header";
import { productFiltration } from "../../features/products/filter/lib/productFiltration";

export default function Products() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();

  const { exported, category } = useAppSelector((state) => state.data.filter);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getActivity());
    dispatch(getBarcodes());

    const unsubscribe = onSnapshot(collection(db, "data"), (querySnapshot) => {
      const collectionSnapshot: ProductType[] = [];

      querySnapshot.forEach((doc: DocumentData) => {
        collectionSnapshot.push(doc.data());
      });

      collectionSnapshot.sort(
        (x, y) => +new Date(x.dates.exp) - +new Date(y.dates.exp)
      );

      setProducts(collectionSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="products">
      <ProductsHeader
        productsLenght={productFiltration(products, category, exported).length}
        category={category}
        exported={exported}
      />

      <div className="products__grid">
        {products && products.length ? (
          productFiltration(products, category, exported).map(
            (product, number) => (
              <ProductsCard
                key={product.id}
                product={product}
                number={number}
              />
            )
          )
        ) : (
          <Ring size={30} color={isDark ? "#ffffff" : "#121212"} />
        )}
      </div>
    </div>
  );
}
