import "./_products.scss";
import { ProductType } from "@/types/types";
import { useEffect, useState } from "react";

import { dataCollection } from "@/lib/controller";
import { DocumentData, onSnapshot } from "firebase/firestore";

import { useAppDispatch } from "@/hooks/redux-hooks";
import { getBarcodes, getProducts } from "@/store/slices/dataSlice";

import { Ring } from "@uiball/loaders";

import ProductsCard from "./components/products-card";
import ProductsHeader from "./components/products-header";

export default function Products() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");

  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBarcodes());

    const unsubscribe = onSnapshot(dataCollection, (querySnapshot) => {
      const collectionSnapshot: ProductType[] = [];

      querySnapshot.forEach((doc: DocumentData) => {
        collectionSnapshot.push(doc.data());
      });

      setProducts(collectionSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="products">
      <ProductsHeader />

      <div className="products__grid">
        {products && products.length ? (
          products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))
        ) : (
          <Ring size={30} color={theme.matches ? "#ffffff" : "#121212"} />
        )}
      </div>
    </div>
  );
}
