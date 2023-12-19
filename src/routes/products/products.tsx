import "./_products.scss";
import { ProductType } from "@/types/types";
import { useEffect, useState } from "react";

import { DocumentData, onSnapshot } from "firebase/firestore";
import { dataCollection } from "@/lib/controller";

import { Ring } from "@uiball/loaders";

import ProductsCard from "./components/products-card";
import ProductsHeader from "./components/products-header";

export default function Products() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(dataCollection, (querySnapshot) => {
      const resultProducts: ProductType[] = [];

      querySnapshot.docChanges().forEach((doc: DocumentData) => {
        console.log("changes in products", doc.doc.data());
        resultProducts.push(doc.doc.data());
      });

      setProducts(resultProducts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
