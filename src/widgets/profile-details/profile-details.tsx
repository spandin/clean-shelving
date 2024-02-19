import css from "./_profile-details.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";

import { BsGear } from "react-icons/bs";

import { UserData } from "@/entities/user";
import { SignIn } from "@/features/authentication/login";
import { SignUp } from "@/features/authentication/register";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function ProfileDetails() {
  const navigate = useNavigate();

  const [authForm, setAuthForm] = useState("login");

  const { id, isAuth } = useAppSelector((state) => state.user);

  const profileInfo = useAppSelector((state) =>
    state.data.users.find((u) => u.id === id)
  );

  return (
    <div className={css.profileDetails}>
      {isAuth ? (
        <>
          <div className={css.detailsWrapper}>
            <div className={css.detailsHeader}>
              <HeaderInformer title="Профиль" subtitle={profileInfo?.email} />
              <button
                className="circle_button"
                onClick={() =>
                  navigate("/settings/", { unstable_viewTransition: true })
                }
              >
                <BsGear />
              </button>
            </div>

            {profileInfo ? (
              <UserData user={profileInfo} />
            ) : (
              "Пользователь не найден"
            )}
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
