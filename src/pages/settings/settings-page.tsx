import css from "./_settings.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  BsChevronRight,
  BsFillMoonStarsFill,
  BsFillPeopleFill,
  BsPersonFillAdd,
  BsUpcScan,
} from "react-icons/bs";

import { removeUser } from "@/app/slices/userSlice";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={css.settings}>
      <div className={css.settingsWrapper}>
        <div className={css.settingsHeader}>
          <HeaderInformer title="Настройки" />
        </div>

        <div className={css.settingsBody}>
          <div className={css.bodyWrapper}>
            <h4>Настройки приложения</h4>

            <div className={css.bodyThemeSwither}>
              <span>
                <BsFillMoonStarsFill />
                Темный режим:
              </span>
            </div>
          </div>

          <div className={css.bodyWrapper}>
            <h4>Настройки БД</h4>
            <Link to={""} className={css.bodyLink}>
              <span>
                <BsUpcScan />
                Редактировать ШК
              </span>{" "}
              <BsChevronRight />
            </Link>
            <Link to={""} className={css.bodyLink}>
              <span>
                <BsFillPeopleFill /> Управ. сотрудниками
              </span>
              <BsChevronRight />
            </Link>
            <div className={css.bodyRegisterSwither}>
              <span>
                <BsPersonFillAdd />
                Регистрация:
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={css.settingsFooter}>
        <button
          onClick={() => {
            dispatch(removeUser()), navigate("/profile/");
          }}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
