import css from "./_signUp.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "@/shared/hooks/redux-hooks";

import IMAGES from "@/assets/images/images";

import { signUpUser } from "../model/signUpAsyncThunk";
import LoadButton from "@/shared/ui/load-button/load-button";

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function SignUp({
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
    await dispatch(signUpUser(data));
  };

  return (
    <div className={css.signUp}>
      <img src={IMAGES.registration} />
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

        <div className={css.buttons}>
          <LoadButton
            type="submit"
            isLoading={isSubmitting}
            text={"Зарегистрироваться"}
            disabled={isValid}
          />

          <button
            className={css.buttonBack}
            onClick={() => setAuthForm("login")}
          >
            Назад
          </button>
        </div>
      </form>
    </div>
  );
}
