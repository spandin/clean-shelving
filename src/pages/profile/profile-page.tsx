import "./_profile.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hooks";
import { getUserInfo } from "@/app/slices/userSlice";

import { BsGear } from "react-icons/bs";
import IMAGES from "@/assets/images/images";

import Informer from "@/shared/ui/informer/informer";
import SignIn from "@/features/authentication/login/ui/signIn";
import SignUp from "@/features/authentication/register/ui/signUp";

export default function ProfilePage() {
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
                        <span>ДОБ:</span>
                        <span>{user.actions && user.actions.added}</span>
                      </div>

                      <div className="tabs__tab__content__user-actions__col">
                        <span>ОБН:</span>
                        <span>{user.actions && user.actions.updated}</span>
                      </div>

                      <div className="tabs__tab__content__user-actions__col">
                        <span>УДЛ:</span>
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
        <SignIn setAuthForm={setAuthForm} />
      ) : (
        <SignUp setAuthForm={setAuthForm} />
      )}
    </div>
  );
}