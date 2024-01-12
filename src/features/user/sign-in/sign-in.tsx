import "../_auth.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux-hooks";

import { signInUser } from "@/store/slices/userSlice";

import { LoadButton } from "../../../components/common/buttons/load-button/load-button";

import IMAGES from "@/assets/images";

interface FormValues {
  email: string;
  password: string;
}

export default function Login({
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
    <div className="login">
      <img src={IMAGES.login} />
      <form
        className="login__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="login__form__title">
          <h1>Войти в аккаунт</h1>
          <p>используя email и пароль</p>
        </div>

        <div className="login__form__inputs">
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

        <div className="login__form__buttons">
          <LoadButton
            type="submit"
            isLoading={isSubmitting}
            text={"Войти"}
            disabled={isValid}
          />
          <div onClick={() => setAuthForm("register")}>Регистрация</div>
        </div>
      </form>
    </div>
  );
}
