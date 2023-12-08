import "./_user.scss";
import { useAuth } from "@/hooks/use-auth";

import { BsGearFill } from "react-icons/bs";

import Login from "@/components/auth/login";
import ButtonBack from "@/components/common/button-back";

export default function User() {
  const { isAuth, email } = useAuth();
  return (
    <div className="user">
      {isAuth ? (
        <>
          <div className="user__wrapper">
            <div className="user__wrapper__header">
              <div className="user__wrapper__header__informer">
                <ButtonBack />
                <div className="user__wrapper__header__informer__col">
                  <span id="user-informer-email">{email}</span>
                  <span id="user-informer-status">Статус</span>
                </div>
              </div>

              <div className="user__wrapper__header__buttons">
                <button className="circle_button">
                  <BsGearFill />
                </button>
              </div>
            </div>

            <div className="user__wrapper__body">
              <ul className="tabs">
                <li className="tabs__tab">
                  <input type="radio" name="tabs" id="tab-1" checked />
                  <label htmlFor="tab-1">Информация</label>
                  <div className="tabs__tab__content">
                    <img
                      id="user-tabs-avatar"
                      src="https://img.goodfon.com/original/1280x960/6/51/victoria-berngard-utro-leto.jpg"
                    />
                    <h2>Имя пользователя</h2>
                  </div>
                </li>
                <li className="tabs__tab">
                  <input type="radio" name="tabs" id="tab-2" />
                  <label htmlFor="tab-2">Активность</label>
                  <div className="tabs__tab__content">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
