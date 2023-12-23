import "./_products.scss";
import { useEffect, useState } from "react";

import { ProductType } from "@/types/types";

import { useTheme } from "@/hooks/use-theme";
import { useAppDispatch } from "@/hooks/redux-hooks";

import { getBarcodes, getProducts } from "@/store/slices/dataSlice";

import { db } from "@/lib/firebase";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { Ring } from "@uiball/loaders";

import ProductsCard from "./components/products-card";
import ProductsHeader from "./components/products-header";

export default function Products() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    dispatch(getProducts());
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
      <ProductsHeader props={products.length} />

      <div className="products__grid">
        {products && products.length ? (
          products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))
        ) : (
          <Ring size={30} color={isDark ? "#ffffff" : "#121212"} />
        )}
      </div>
    </div>
  );
}
