import "../app/styles/_reset.scss";
import "../app/styles/_global.scss";
import "./_root.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";
setDefaultOptions({ locale: ru });

export default function Root() {
  const location = useLocation();

  return (
    <div className="layout">
      <Navbar />
      <main>
        {location.pathname !== "/" ? <Outlet /> : <AboutProject />}

        <ToastContainer theme="dark" position="bottom-center" limit={1} />
      </main>
      <aside>
        <Activity />
      </aside>

      <ScrollRestoration />
    </div>
  );
}

import IMAGES from "@/assets/images";
import Activity from "@/pages/activity/activity";
import Navbar from "@/widgets/navbar/navbar";

function AboutProject() {
  return (
    <div className="about_project">
      <div className="about_project__wrapper">
        <img src={IMAGES.registration} />
      </div>
    </div>
  );
}
