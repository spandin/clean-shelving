import "@/shared/styles/_reset.scss";
import "@/shared/styles/_global.scss";
import css from "./_rootLayout.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import IMAGES from "@/assets/images/images";

import Navbar from "@/shared/ui/navbar/navbar";
import Activity from "@/pages/activity/activity-page";

import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";
setDefaultOptions({ locale: ru });

export default function Rootlayout() {
  const location = useLocation();

  return (
    <div className={css.rootLayout}>
      <Navbar />
      <main>
        {location.pathname !== "/" ? <Outlet /> : <AbountApp />}

        <ToastContainer theme="dark" position="bottom-center" limit={1} />
      </main>

      <aside>
        <Activity />
      </aside>
    </div>
  );
}

function AbountApp() {
  return (
    <div className="abountApp">
      <div className="abountApp__wrapper">
        <img src={IMAGES.registration} />
      </div>
    </div>
  );
}
