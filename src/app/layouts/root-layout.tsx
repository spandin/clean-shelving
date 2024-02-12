import "@/app/styles/_reset.scss";
import "@/app/styles/_global.scss";
import css from "./_root-layout.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch } from "@/shared/lib/hooks/use-redux";
import {
  getActivity,
  getBarcodes,
  getProducts,
  getUsers,
} from "../slices/dataSlice";

import { NavigationBar } from "@/widgets/navigation-bar/navigation-bar";
import { AsideBar } from "@/widgets/aside-bar/aside-bar";
import { AbountShop } from "@/widgets/abount-shop/abount-shop";

import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";

setDefaultOptions({ locale: ru });

export default function Rootlayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getBarcodes());
    dispatch(getActivity());
  }, [dispatch]);

  return (
    <div className={css.rootLayout}>
      <NavigationBar />
      <main>
        {location.pathname !== "/" ? <Outlet /> : <AbountShop />}

        <ToastContainer theme="dark" position="bottom-center" limit={1} />
      </main>

      <AsideBar />
    </div>
  );
}
