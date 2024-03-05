import css from "./_settings.module.scss";

import { useDispatch } from "react-redux";

import { removeUser } from "@/app/slices/userSlice";
import { setTheme } from "@/app/slices/settingsSlice";

import {
  BsChevronRight,
  BsFillMoonStarsFill,
  BsFillPeopleFill,
  BsPersonFillAdd,
  BsUpcScan,
} from "react-icons/bs";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";
import CustomLink from "@/shared/ui/custom-link/custom-link";
import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function SettingsPage() {
  const dispatch = useDispatch();

  const { theme } = useAppSelector((state) => state.settings);

  return (
    <div className={css.settings}>
      <div className={css.settingsWrapper}>
        <div className={css.settingsHeader}>
          <HeaderInformer title="Настройки" />
        </div>

        <div className={css.settingsBody}>
          <div className={css.bodyWrapper}>
            <div className={css.bodySection}>
              <h4>Настройки приложения</h4>

              <div className={css.themeSwither}>
                <span>
                  <BsFillMoonStarsFill />
                  Темный режим:
                </span>
                <label className="active">
                  <input
                    type="checkbox"
                    onClick={() =>
                      theme != "light"
                        ? dispatch(setTheme("light"))
                        : dispatch(setTheme("dark"))
                    }
                  />
                  <span
                    className={
                      theme === "dark"
                        ? `${css.slider} ${css.active}`
                        : css.slider
                    }
                  ></span>
                </label>
              </div>
            </div>
            <div className={css.bodySection}>
              <h4>Настройки БД</h4>
              <div className={css.registerSwither}>
                <span>
                  <BsPersonFillAdd />
                  Регистрация:
                </span>
              </div>
              <CustomLink to={""} className={css.bodyLink}>
                <span>
                  <BsFillPeopleFill /> Управ. сотрудниками
                </span>
                <BsChevronRight />
              </CustomLink>
              <CustomLink to={""} className={css.bodyLink}>
                <span>
                  <BsUpcScan />
                  Редактировать ШК
                </span>{" "}
                <BsChevronRight />
              </CustomLink>
            </div>
          </div>
        </div>
      </div>

      <div className={css.settingsFooter}>
        <NavigateButton
          text="Выйти из аккаунта"
          className={css.logoutButton}
          to={"/profile/"}
          action={() => dispatch(removeUser())}
        ></NavigateButton>
      </div>
    </div>
  );
}
