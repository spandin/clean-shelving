import "./_product-id.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "@/lib/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import { Ring } from "@uiball/loaders";

import ProductHeader from "./components/product-header";
import ProductBody from "./components/product-body";
import ProductFooter from "./components/product-footer";

export default function ProductId() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<DocumentData>({});

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnap = await getDoc(doc(db, "data", `${productId}`));

        setIsLoading(true);

        if (productSnap.exists()) {
          console.log(productSnap.data());

          setProduct(productSnap.data());
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

  if (isLoading)
    return (
      <>
        <Ring size={30} color={theme.matches ? "#ffffff" : "#121212"} />
      </>
    );

  return (
    <div className="product-id">
      {Object.keys(product) && Object.keys(product).length ? (
        <>
          <div className="product-id__wrapper">
            <ProductHeader product={product} />
            <ProductBody product={product} />
          </div>
          <ProductFooter />
        </>
      ) : null}
    </div>
  );
}
