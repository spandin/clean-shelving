import "../scss/reset.scss";
import "./_global.scss";
import "./_root.scss";

import { Link, Outlet, useLocation } from "react-router-dom";

import {
  BsHouse,
  BsPieChart,
  BsPlusCircle,
  BsSpeedometer,
} from "react-icons/bs";

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

      <main>
        <Outlet />
      </main>
      <aside />
    </div>
  );
}
