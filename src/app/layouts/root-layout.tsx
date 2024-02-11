import "@/shared/styles/_reset.scss";
import "@/shared/styles/_global.scss";
import css from "./_root-layout.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch } from "@/shared/hooks/redux-hooks";
import {
  getActivity,
  getBarcodes,
  getProducts,
  getUsers,
} from "../slices/dataSlice";

import IMAGES from "@/assets/images/images";

import Navbar from "@/shared/ui/navbar/navbar";
import Activity from "@/pages/activity/activity-page";

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
      <Navbar />
      <main>
        {location.pathname !== "/" ? <Outlet /> : <AbountShop />}

        <ToastContainer theme="dark" position="bottom-center" limit={1} />
      </main>

      <aside>
        <Activity />
      </aside>
    </div>
  );
}

import { useAppSelector } from "@/shared/hooks/redux-hooks";

function AbountShop() {
  const navigate = useNavigate();

  const productsLenght = useAppSelector((state) => state.data.products.length);
  const usersLenght = useAppSelector((state) => state.data.users.length);

  return (
    <div className={css.abountShop}>
      <img src={IMAGES.registration} />
      <div className={css.shopInfo}>
        <h2>Добро пожаловать в Clean Shelving!</h2>
        <span>
          На данный момент в вашем магазине{" "}
          <span id={css.products}>{productsLenght} активных позиций</span> и{" "}
          <span id={css.users}>{usersLenght} сотрудников</span>.
        </span>
      </div>

      <button
        id={css.go_to_list}
        onClick={() => navigate("products/", { unstable_viewTransition: true })}
      >
        Перейти к списку
      </button>
    </div>
  );
}
