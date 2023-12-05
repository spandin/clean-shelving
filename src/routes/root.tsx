import "../scss/reset.scss";
import "./_global.scss";
import "./_root.scss";

import { Link, Outlet } from "react-router-dom";

import {
  BsHouse,
  BsPieChart,
  BsPlusCircle,
  BsSpeedometer2,
} from "react-icons/bs";

export default function Root() {
  return (
    <div className="layout">
      <nav className="navbar">
        <Link className="navbar__avatar" to={"user/"}>
          S
        </Link>
        <div className="navbar__menu">
          <Link className="navbar__menu__item" id="menu_add" to={"add/"}>
            <BsPlusCircle />
          </Link>
          <Link className="navbar__menu__item" to={"products/"}>
            <BsHouse />
          </Link>
          <Link className="navbar__menu__item" to={"statistics/"}>
            <BsPieChart />
          </Link>
          <Link className="navbar__menu__item" to={"activity/"}>
            <BsSpeedometer2 />
          </Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
      <aside></aside>
    </div>
  );
}
