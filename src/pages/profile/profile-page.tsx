import "./_profile.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";
import { getUserInfo } from "@/app/slices/userSlice";

import { BsGear } from "react-icons/bs";

import { UserData } from "@/entities/user";
import { SignIn } from "@/features/authentication/login";
import { SignUp } from "@/features/authentication/register";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";

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
              <HeaderInformer title="Профиль" subtitle={user.email} />
              <button
                className="circle_button"
                onClick={() =>
                  navigate("/settings/", { unstable_viewTransition: true })
                }
              >
                <BsGear />
              </button>
            </div>

            <UserData user={user} />
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
