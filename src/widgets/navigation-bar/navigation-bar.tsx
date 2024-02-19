import css from "./_navigation-bar.module.scss";

import CustomLink from "@/shared/ui/link/custom-link";

import {
  BsHouseFill,
  BsFillAwardFill,
  BsSpeedometer,
  BsFillPersonFill,
} from "react-icons/bs";

export function NavigationBar() {
  return (
    <nav className={css.navbar}>
      <CustomLink className={css.navbarAvatar} to={"profile/"}>
        <BsFillPersonFill />
      </CustomLink>

      <div className={css.navbarMenu}>
        <CustomLink
          className={`circle_button ${
            location.pathname === "/products/" ? "active" : null
          }`}
          to={"products/"}
        >
          <BsHouseFill />
        </CustomLink>

        <CustomLink
          className={`circle_button ${
            location.pathname === "/rating/" ? "active" : null
          }`}
          to={"rating/"}
        >
          <BsFillAwardFill />
        </CustomLink>

        <CustomLink
          className={`circle_button ${
            location.pathname === "/activity/" ? "active" : null
          }`}
          id={css.menu_activity}
          to={"activity/"}
        >
          <BsSpeedometer />
        </CustomLink>
      </div>
    </nav>
  );
}
