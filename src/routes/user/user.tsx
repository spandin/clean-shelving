import "./_user.scss";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

import { BsGear } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";
import Login from "@/components/auth/login";

export default function User() {
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="user">
      {isAuth ? (
        <>
          <div className="user__wrapper">
            <div className="user__wrapper__header">
              <Informer title="Имя" subtitle={email} />

              <div className="user__wrapper__header__buttons">
                <button
                  className="circle_button"
                  onClick={() => navigate("/settings/")}
                >
                  <BsGear />
                </button>
              </div>
            </div>

            <div className="user__wrapper__body">
              <ul className="tabs">
                <li className="tabs__tab">
                  <input type="radio" name="tabs" id="tab-1" defaultChecked />
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
