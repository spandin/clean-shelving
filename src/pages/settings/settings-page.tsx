import css from "./_settings.module.scss";

import { useDispatch } from "react-redux";

import { removeUser } from "@/app/slices/userSlice";

import {
  BsChevronRight,
  BsFillMoonStarsFill,
  BsFillPeopleFill,
  BsPersonFillAdd,
  BsUpcScan,
} from "react-icons/bs";

import CustomLink from "@/shared/ui/link/custom-link";
import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function SettingsPage() {
  const dispatch = useDispatch();

  return (
    <div className={css.settings}>
      <div className={css.settingsWrapper}>
        <div className={css.settingsHeader}>
          <HeaderInformer title="Настройки" />
        </div>

        <div className={css.settingsBody}>
          <div className={css.bodyWrapper}>
            {" "}
            <div className={css.bodySection}>
              <h4>Настройки приложения</h4>

              <div className={css.bodyThemeSwither}>
                <span>
                  <BsFillMoonStarsFill />
                  Темный режим:
                </span>
              </div>
            </div>
            <div className={css.bodySection}>
              <h4>Настройки БД</h4>
              <div className={css.bodyRegisterSwither}>
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
        <NavigateButton to={"/profile/"} action={dispatch(removeUser())}>
          Выйти из аккаунта
        </NavigateButton>
      </div>
    </div>
  );
}
