import "./_product-id.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Ring } from "@uiball/loaders";
import ProductHeader from "./components/product-header";
import ProductBody from "./components/product-body";
import ProductFooter from "./components/product-footer";

export default function ProductId() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnap = await getDoc(doc(db, `data/${productId}`));
        setIsLoading(true);
        if (productSnap.exists()) {
          const productData = {
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
    fetchProductData();
  }, [productId]);

  console.log(product);

  if (isLoading)
    return (
      <>
        <Ring size={30} color={theme.matches ? "#121212" : "#ffffff"} />
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
