import css from "./_profile-details.module.scss";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";

import { BsGear } from "react-icons/bs";

import { UserData } from "@/entities/user";
import { SignIn } from "@/features/authentication/login";
import { SignUp } from "@/features/authentication/register";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";

export default function ProfileDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [authForm, setAuthForm] = useState("login");

  const isAuth = useAppSelector((state) => state.user.isAuth);

  const user = useAppSelector((state) =>
    state.data.users.find((u) => u.id === userId)
  );

  return (
    <div className={css.profileDetails}>
      {isAuth ? (
        <>
          <div className={css.detailsWrapper}>
            <div className={css.detailsHeader}>
              <HeaderInformer title="Профиль" subtitle={user?.email} />
              <button
                className="circle_button"
                onClick={() =>
                  navigate("/settings/", { unstable_viewTransition: true })
                }
              >
                <BsGear />
              </button>
            </div>

            {user ? <UserData user={user} /> : "Пользователь не найден"}
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
