import "@/app/styles/_reset.scss";
import "@/app/styles/_global.scss";
import css from "./_root-layout.module.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "@/app/styles/_toast.scss";

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import {
  getActivity,
  getBarcodes,
  getProducts,
  getUsers,
} from "../slices/dataSlice";

import { NavigationBar } from "@/widgets/navigation-bar/navigation-bar";
import { AsideBar } from "@/widgets/aside-bar/aside-bar";
import { AbountShop } from "@/widgets/abount-shop/abount-shop";
import { setThemeAndMeta } from "@/shared/helpers/pwa";

import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";

setDefaultOptions({ locale: ru });

export default function Rootlayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { theme } = useAppSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBarcodes());
    dispatch(getUsers());
    dispatch(getActivity());

    setThemeAndMeta(theme);

    console.info("ROOT LAYOUT: db is loaded");
  }, [dispatch, theme]);

  return (
    <div className={css.rootLayout}>
      <NavigationBar />
      <main>
        {location.pathname !== "/" ? <Outlet /> : <AbountShop />}

        <ToastContainer theme={theme === "dark" ? "dark" : "light"} limit={1} />
      </main>

      <AsideBar />
    </div>
  );
}
