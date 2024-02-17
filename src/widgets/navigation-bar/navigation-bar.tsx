import css from "./_navigation-bar.module.scss";

import { Link } from "react-router-dom";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";

import {
  BsHouseFill,
  BsFillAwardFill,
  BsSpeedometer,
  BsFillPersonFill,
} from "react-icons/bs";

export function NavigationBar() {
  const user = useAppSelector((state) => state.user);
  return (
    <nav className={css.navbar}>
      <Link
        className={css.navbarAvatar}
        to={"profile/"}
        preventScrollReset
        unstable_viewTransition
      >
        {user.name ? user.name.charAt(0).toUpperCase() : <BsFillPersonFill />}
      </Link>

      <div className={css.navbarMenu}>
        <Link
          className={`circle_button ${
            location.pathname === "/products/" ? "active" : null
          }`}
          to={"products/"}
          preventScrollReset
          unstable_viewTransition
        >
          <BsHouseFill />
        </Link>

        <Link
          className={`circle_button ${
            location.pathname === "/rating/" ? "active" : null
          }`}
          to={"rating/"}
          preventScrollReset
          unstable_viewTransition
        >
          <BsFillAwardFill />
        </Link>

        <Link
          className={`circle_button ${
            location.pathname === "/activity/" ? "active" : null
          }`}
          id={css.menu_activity}
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
