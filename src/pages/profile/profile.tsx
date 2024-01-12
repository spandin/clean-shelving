import "./_profile.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getUserInfo } from "@/store/slices/userSlice";

import { BsGear } from "react-icons/bs";
import IMAGES from "@/assets/images";

import Login from "@/features/user/sign-in/sign-in";
import Register from "@/features/user/sign-up/sign-up";
import Informer from "@/shared/components/common/informer/informer";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authForm, setAuthForm] = useState("login");

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo(`${user.id}`));
  }, [dispatch, user.id]);

  return (
    <div className="profile">
      {user.isAuth ? (
        <>
          <div className="profile__wrapper">
            <div className="profile__wrapper__header">
              <Informer title="Профиль" subtitle={user.email} />
              <button
                className="circle_button"
                onClick={() =>
                  navigate("/settings/", { unstable_viewTransition: true })
                }
              >
                <BsGear />
              </button>
            </div>

            <div className="profile__wrapper__body">
              <ul className="tabs">
                <li className="tabs__tab">
                  <input type="radio" name="tabs" id="tab-1" defaultChecked />
                  <label htmlFor="tab-1">Информация</label>
                  <div className="tabs__tab__content">
                    <img id="user_avatar" src={IMAGES.user_avatar} />

                    <div className="tabs__tab__content__user-info">
                      <h2>{user.name}</h2>
                      <p>{user.role}</p>
                    </div>

                    <div className="tabs__tab__content__user-actions">
                      <div className="tabs__tab__content__user-actions__col">
                        <span>ADD:</span>
                        <span>{user.actions && user.actions.added}</span>
                      </div>

                      <div className="tabs__tab__content__user-actions__col">
                        <span>UPD:</span>
                        <span>{user.actions && user.actions.updated}</span>
                      </div>

                      <div className="tabs__tab__content__user-actions__col">
                        <span>DEL:</span>
                        <span>{user.actions && user.actions.deleted}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="tabs__tab">
                  <input type="radio" name="tabs" id="tab-2" />
                  <label htmlFor="tab-2">Активность</label>
                  <div className="tabs__tab__content">Функция в разработке</div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : authForm === "login" ? (
        <Login setAuthForm={setAuthForm} />
      ) : (
        <Register />
      )}
    </div>
  );
}
