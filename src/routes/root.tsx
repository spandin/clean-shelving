import "../scss/_reset.scss";
import "../scss/_global.scss";
import "./_root.scss";

import { Link, Outlet, useLocation } from "react-router-dom";

import {
  BsHouse,
  BsPieChart,
  BsPlusCircle,
  BsSpeedometer,
} from "react-icons/bs";
import Activity from "./activity/activity";

export default function Root() {
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <Link className="navbar__avatar" to={"user/"}>
          S
        </Link>

        <div className="navbar__menu">
          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/add/" ? "active" : null
            }`}
            id="menu_add"
            to={"add/"}
          >
            <BsPlusCircle />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/products/" ? "active" : null
            }`}
            to={"products/"}
          >
            <BsHouse />
          </Link>

          <Link
            className={`navbar__menu__item circle_button ${
              location.pathname === "/statistics/" ? "active" : null
            }`}
            to={"statistics/"}
          >
            <BsPieChart />
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

      <main>{location.pathname !== "/" ? <Outlet /> : <AboutProject />}</main>
      <aside>
        <Activity />
      </aside>
    </div>
  );
}

import IMAGES from "@/assets/images";

function AboutProject() {
  return (
    <div className="about_project">
      <div className="about_project__wrapper">
        <img src={IMAGES.welcoming} />
      </div>
    </div>
  );
}
