import css from "./_sign-in.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "@/shared/lib/hooks/use-redux";
import { signInUser } from "../store/thunk";

import IMAGES from "@/assets";
import LoadButton from "@/shared/ui/buttons/load-button/load-button";
import ActionButton from "@/shared/ui/buttons/action-button/action-button";

interface FormValues {
  email: string;
  password: string;
}

export function SignIn({
  setAuthForm,
}: {
  setAuthForm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await dispatch(signInUser(data));
  };

  return (
    <div className={css.signIn}>
      <img src={IMAGES.login} />
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
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
              maxLength: {
                value: 25,
                message: "Минимальная длина пароля 25 символов",
              },
            })}
          />
        </div>

        <div className={css.buttons}>
          <LoadButton
            className={css.signInButton}
            type="submit"
            disabled={isValid}
            isLoading={isSubmitting}
            text={"Войти"}
          />
          <ActionButton
            className={css.signUpButton}
            action={() => setAuthForm("register")}
          >
            Регистрация
          </ActionButton>
        </div>
      </form>
    </div>
  );
}
