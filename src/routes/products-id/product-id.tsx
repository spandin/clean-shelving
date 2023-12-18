import "./_product-id.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductType } from "@/types/types";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Ring } from "@uiball/loaders";

import ProductHeader from "./components/product-header";
import ProductBody from "./components/product-body";
import ProductFooter from "./components/product-footer";

export default function ProductId() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnap = await getDoc(doc(db, `data/${productId}`));

        setIsLoading(true);

        if (productSnap.exists()) {
          const productData: ProductType = {
            id: productSnap.id,
            ...productSnap.data(),
          };

          setProduct(productData);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(`ProductID: ${error}`);
      }
    };

    return () => {
      fetchProductData();
    };
  }, [productId]);

  console.log(typeof product);

  if (isLoading)
    return (
      <>
        <Ring size={30} color={theme.matches ? "#ffffff" : "#121212"} />
      </>
    );

  return (
    <div className="product-id">
      {product ? (
        <>
          <div className="product-id__wrapper">
            <ProductHeader product={product} />
            <ProductBody product={product} />
          </div>
          <ProductFooter />
        </>
      ) : (
        <Ring size={30} color={theme.matches ? "#ffffff" : "#121212"} />
      )}
    </div>
  );
}
