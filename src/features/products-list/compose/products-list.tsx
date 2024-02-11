import "./_products-list.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductType } from "@/types/types";

import { useTheme } from "@/shared/hooks/use-theme";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";

import { getActivity, getBarcodes, getProducts } from "@/app/slices/dataSlice";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";

import { Ring } from "@uiball/loaders";
import { BsFilterCircle, BsPlusCircle } from "react-icons/bs";

import ProductCard from "@/entities/product/ui/productCard";

import { ProductsFilters } from "..";
import productsFiltration from "../lib/products-filtration";
import Informer from "@/shared/ui/informer/informer";
import { Modal } from "@/shared/ui/modal/modal";

export function ProductsList() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { exported, category } = useAppSelector((state) => state.data.filter);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [filterModalActive, setFilterModalActive] = useState(false);

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
      <div className="products__header">
        <Informer
          title={`${category} ${
            exported === "Все" ? "🙌" : exported === true ? "👍" : "👎"
          } `}
          subtitle={`${
            productsFiltration(products, category, exported).length
          } позиций`}
        />

        <div className="products__header__buttons">
          <button
            className="circle_button"
            id="add"
            onClick={() => navigate("/add/", { unstable_viewTransition: true })}
          >
            <BsPlusCircle />
          </button>
          <button
            className="circle_button"
            id="filter"
            onClick={() => setFilterModalActive(true)}
          >
            <BsFilterCircle />
          </button>
        </div>

        <Modal active={filterModalActive} setActive={setFilterModalActive}>
          <ProductsFilters />
        </Modal>
      </div>

      <div className="products__grid">
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
    </div>
  );
}
