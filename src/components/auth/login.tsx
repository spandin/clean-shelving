import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux-hooks";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/store/slices/userSlice";

import { LoadButton } from "../common/load-button";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const [errorAuth, setErrorAuth] = useState("");

  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        ({ user }) => {
          console.log(user),
            dispatch(
              setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
              })
            );
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(`Login`, e.message);
      setErrorAuth(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <input
            placeholder="your@email.com"
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

        <p>{errorAuth}</p>

        <LoadButton
          type="submit"
          isLoading={isSubmitting}
          text={"Войти"}
          disabled={isValid}
        />
      </form>
    </div>
  );
}
