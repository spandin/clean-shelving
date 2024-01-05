import "../scss/_reset.scss";
import "../scss/_global.scss";
import "./_root.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";
setDefaultOptions({ locale: ru });

import {
  BsHouseFill,
  BsFillAwardFill,
  BsPlusCircleFill,
  BsSpeedometer,
} from "react-icons/bs";

import Activity from "./activity/activity";

export default function Root() {
  const location = useLocation();
  const user = useAuth();

  return (
    <div className="layout">
      <nav className="navbar">
        <Link className="navbar__avatar" to={"profile/"}>
          {user.email ? user.email.charAt(0).toUpperCase() : "Г"}
        </Link>

        <div className="navbar__menu">
          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/add/" ? "active" : null
            }`}
            id="menu_add"
            to={"add/"}
          >
            <BsPlusCircleFill />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/products/" ? "active" : null
            }`}
            to={"products/"}
          >
            <BsHouseFill />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/statistics/" ? "active" : null
            }`}
            to={"statistics/"}
          >
            <BsFillAwardFill />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/activity/" ? "active" : null
            }`}
            id="menu_activity"
            to={"activity/"}
          >
            <BsSpeedometer />
          </Link>
        </div>
      </nav>
      <main>
        {location.pathname !== "/" ? <Outlet /> : <AboutProject />}

        <ToastContainer theme="dark" position="bottom-center" limit={1} />
      </main>
      <aside>
        <Activity />
      </aside>
    </div>
  );
}

import IMAGES from "@/assets/images";
import { useAuth } from "@/hooks/use-auth";

function AboutProject() {
  return (
    <div className="about_project">
      <div className="about_project__wrapper">
        <img src={IMAGES.registration} />
      </div>
    </div>
  );
}
