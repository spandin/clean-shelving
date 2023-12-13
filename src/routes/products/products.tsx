import "./_products.scss";
import { ProductType } from "@/types/types";
import { useEffect, useState } from "react";

import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { dataCollection } from "@/lib/controller";

import ProductsCard from "./components/products-card";
import ProductsHeader from "./components/products-header";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(
    () =>
      onSnapshot(dataCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setProducts(
          snapshot.docs.map((docs) => {
            return {
              id: docs.id,
              ...docs.data(),
            };
          })
        );
      }),
    []
  );

  return (
    <div className="products">
      <ProductsHeader />

      <div className="products__grid">
        {products && products.length
          ? products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))
          : null}
      </div>
    </div>
  );
}
