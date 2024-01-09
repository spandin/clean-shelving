import "../scss/_reset.scss";
import "../scss/_global.scss";
import "./_root.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppSelector } from "@/hooks/redux-hooks";

import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";
setDefaultOptions({ locale: ru });

import {
  BsHouseFill,
  BsFillAwardFill,
  BsPlusCircleFill,
  BsSpeedometer,
  BsFillPersonFill,
} from "react-icons/bs";

import Activity from "./activity/activity";

export default function Root() {
  const location = useLocation();
  const user = useAppSelector((state) => state.user);

  return (
    <div className="layout">
      <nav className="navbar">
        <Link
          className="navbar__avatar"
          to={"profile/"}
          preventScrollReset
          unstable_viewTransition
        >
          {user.name ? user.name.charAt(0).toUpperCase() : <BsFillPersonFill />}
        </Link>

        <div className="navbar__menu">
          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/add/" ? "active" : null
            }`}
            id="menu_add"
            to={"add/"}
            preventScrollReset
            unstable_viewTransition
          >
            <BsPlusCircleFill />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/products/" ? "active" : null
            }`}
            to={"products/"}
            preventScrollReset
            unstable_viewTransition
          >
            <BsHouseFill />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/statistics/" ? "active" : null
            }`}
            to={"statistics/"}
            preventScrollReset
            unstable_viewTransition
          >
            <BsFillAwardFill />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/activity/" ? "active" : null
            }`}
            id="menu_activity"
            to={"activity/"}
            preventScrollReset
            unstable_viewTransition
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

      <ScrollRestoration />
    </div>
  );
}

import IMAGES from "@/assets/images";

function AboutProject() {
  return (
    <div className="about_project">
      <div className="about_project__wrapper">
        <img src={IMAGES.registration} />
      </div>
    </div>
  );
}
