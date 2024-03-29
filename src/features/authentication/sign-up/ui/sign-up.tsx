import css from "./_sign-up.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { signUpUser } from "../store/thunk";

import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useTheme } from "@/shared/hooks/use-theme";
import LoadButton from "@/shared/ui/buttons/load-button/load-button";
import NavigateButton from "@/shared/ui/buttons/navigate-button/navigate-button";

import { IMAGES_LIGHT, IMAGES_DARK } from "@/assets";
import AuthErrors from "@/shared/ui/auth-errors/auth-errors";

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

export function SignUpForm() {
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
    await dispatch(signUpUser({ data, setError }));
    navigate("/products/", { unstable_viewTransition: true });
  };

  return (
    <div className={css.signUp}>
      <img
        src={isDark ? IMAGES_DARK.registration_d : IMAGES_LIGHT.registration}
      />

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.formTitle}>
          <h1>Регистрация</h1>
          <p>используя email и пароль</p>
        </div>

        <div className={css.inputs}>
          <input
            placeholder="Email"
            type="email"
            autoComplete="off"
            {...register("email", {
              required: "Введите email",
              minLength: {
                value: 8,
                message: "Минимальная длина email 8 символов",
              },
              maxLength: {
                value: 30,
                message: "Максимальная длина email 30 символов",
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
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
              maxLength: {
                value: 25,
                message: "Минимальная длина пароля 25 символов",
              },
            })}
          />

          <div className={css.inputsRow}>
            <input
              placeholder="Имя"
              type="text"
              autoComplete="off"
              {...register("name", {
                required: "Введите имя",
                minLength: {
                  value: 2,
                  message: "Минимальная длина имени 2 символа",
                },
                maxLength: {
                  value: 15,
                  message: "Минимальная длина имени 15 символов",
                },
              })}
            />
            <input
              placeholder="Должность"
              type="text"
              autoComplete="off"
              {...register("role", {
                required: "Введите должность",
                minLength: {
                  value: 6,
                  message: "Минимальная длина должности 6 символов",
                },
                maxLength: {
                  value: 25,
                  message: "Минимальная длина должности 25 символов",
                },
              })}
            />
          </div>
        </div>

        <AuthErrors error={error} />

        <div className={css.buttons}>
          <LoadButton
            className={css.signUpButton}
            text={"Зарегистрироваться"}
            isLoading={isSubmitting}
            disabled={isValid}
          />

          <NavigateButton
            text="Назад"
            className={css.backButton}
            to={"/sign-in/"}
          />
        </div>
      </form>
    </div>
  );
}
