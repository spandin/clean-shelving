import css from "./_sign-in.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { signInUser } from "../store/thunk";

import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useTheme } from "@/shared/hooks/use-theme";
import LoadButton from "@/shared/ui/buttons/load-button/load-button";
import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";
import AuthErrors from "@/shared/ui/auth-errors/auth-errors";

import { IMAGES_LIGHT, IMAGES_DARK } from "@/assets";

interface FormValues {
  email: string;
  password: string;
}

export function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDark } = useTheme();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await dispatch(signInUser({ data, setError }));
    navigate("/products/", { unstable_viewTransition: true });
  };

  return (
    <div className={css.signIn}>
      <img src={isDark ? IMAGES_DARK.login_d : IMAGES_LIGHT.login} />

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.formTitle}>
          <h1>Войти в аккаунт</h1>
          <p>используя email и пароль</p>
        </div>

        <div className={css.inputs}>
          <input
            placeholder="Email"
            type="email"
            autoComplete="off"
            {...register("email", {
              required: "Введите email и пароль",
              minLength: { value: 8, message: "Минимальная длина 8 символов" },
              maxLength: {
                value: 30,
                message: "Максимальная длина 30 символов",
              },
            })}
          />

          <input
            placeholder="Пароль"
            type="password"
            autoComplete="off"
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 8,
                message: "Минимальная длина пароля 8 символов",
              },
              maxLength: {
                value: 25,
                message: "Минимальная длина пароля 25 символов",
              },
            })}
          />
        </div>

        <AuthErrors error={error} />

        <div className={css.buttons}>
          <LoadButton
            className={css.signInButton}
            disabled={isValid}
            isLoading={isSubmitting}
            text={"Войти"}
          />

          <NavigateButton
            text="Регистрация"
            className={css.signUpButton}
            to={"/sign-up/"}
          />
        </div>
      </form>
    </div>
  );
}
