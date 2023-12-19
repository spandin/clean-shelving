import "./_product-id.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "@/lib/firebase";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

import { Ring } from "@uiball/loaders";

import ProductHeader from "./components/product-header";
import ProductBody from "./components/product-body";
import ProductFooter from "./components/product-footer";

export default function ProductId() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");
  const { productId } = useParams();

  const [product, setProduct] = useState<QueryDocumentSnapshot>();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productSnap = await getDoc(doc(db, "data", `${productId}`));

        if (productSnap.exists()) {
          console.log(productSnap.data());

          setProduct(productSnap.data());
        }
      } catch (error) {
        console.log(`ProductID: ${error}`);
      }
    };

    return () => {
      fetchProductData();
    };
  }, [productId]);

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
