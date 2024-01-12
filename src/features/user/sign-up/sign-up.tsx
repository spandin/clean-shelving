import "../_auth.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux-hooks";

import { signUpUser } from "@/store/slices/userSlice";

import IMAGES from "@/assets/images";

import { LoadButton } from "@/shared/components/common/buttons/load-button/load-button";

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function Register() {
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
    <div className="register">
      <img src={IMAGES.registration} />
      <form
        className="register__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="register__form__title">
          <h1>Регистрация</h1>
          <p>используя email и пароль</p>
        </div>

        <div className="register__form__inputs">
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

          <div className="register__form__inputs__row">
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

        <LoadButton
          type="submit"
          isLoading={isSubmitting}
          text={"Зарегистрироваться"}
          disabled={isValid}
        />
      </form>
    </div>
  );
}
