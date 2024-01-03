import "./_user.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { BsGear } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";
import Login from "@/components/auth/login";

import IMAGES from "@/assets/images";
import { getUserInfo } from "@/store/slices/userSlice";

export default function User() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo(`${user.id}`));
  }, [dispatch, user.id]);

  return (
    <div className="user">
      {user.isAuth ? (
        <>
          <div className="user__wrapper">
            <div className="user__wrapper__header">
              <Informer title="Имя" subtitle={user.email} />
              <button
                className="circle_button"
                onClick={() => navigate("/settings/")}
              >
                <BsGear />
              </button>
            </div>

            <div className="user__wrapper__body">
              <ul className="tabs">
                <li className="tabs__tab">
                  <input type="radio" name="tabs" id="tab-1" defaultChecked />
                  <label htmlFor="tab-1">Информация</label>
                  <div className="tabs__tab__content">
                    <img id="user_avatar" src={IMAGES.user_avatar} />

                    <div className="tabs__tab__content__user-info">
                      <h2>{user.name}</h2>
                      <p>{user.email}</p>
                    </div>

                    <div className="tabs__tab__content__user-actions">
                      <div className="tabs__tab__content__user-actions__col">
                        <span>Добавил</span>
                        <span>{user.actions && user.actions.added}</span>
                      </div>

                      <div className="tabs__tab__content__user-actions__col">
                        <span>Обновил</span>
                        <span>{user.actions && user.actions.updated}</span>
                      </div>

                      <div className="tabs__tab__content__user-actions__col">
                        <span>Удалил</span>
                        <span>{user.actions && user.actions.deleted}</span>
                      </div>
                    </div>
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
