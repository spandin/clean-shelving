import "./_navbar.scss";

import { Link } from "react-router-dom";

import { useAppSelector } from "@/shared/hooks/redux-hooks";

import {
  BsHouseFill,
  BsFillAwardFill,
  BsPlusCircleFill,
  BsSpeedometer,
  BsFillPersonFill,
} from "react-icons/bs";

export default function Navbar() {
  const user = useAppSelector((state) => state.user);
  return (
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
            location.pathname === "/rating/" ? "active" : null
          }`}
          to={"rating/"}
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
  );
}
