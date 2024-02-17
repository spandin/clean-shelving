import css from "./_profile-details.module.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";
import { getUserInfo } from "@/app/slices/userSlice";

import { BsGear } from "react-icons/bs";

import { UserData } from "@/entities/user";
import { SignIn } from "@/features/authentication/login";
import { SignUp } from "@/features/authentication/register";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function ProfileDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authForm, setAuthForm] = useState("login");

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo(`${user.id}`));
  }, [dispatch, user.id]);

  return (
    <div className={css.profileDetails}>
      {user.isAuth ? (
        <>
          <div className={css.detailsWrapper}>
            <div className={css.detailsHeader}>
              <HeaderInformer title="Профиль" subtitle={user.email} />
              <button
                className="circle_button"
                onClick={() =>
                  navigate("/settings/", { unstable_viewTransition: true })
                }
                onTouchStart={() =>
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
