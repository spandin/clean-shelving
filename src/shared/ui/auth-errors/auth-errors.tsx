import { useEffect, useState } from "react";
import css from "./_auth-error.module.scss";

export default function AuthErrors({ error }: { error: string | null }) {
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    switch (error) {
      case "SIGN-IN: Firebase: Error (auth/invalid-credential).":
        return setAuthError("Не верный логин или пароль");

      case "SIGN-IN: Firebase: Error (auth/invalid-email).":
        return setAuthError(
          "Проверьте правильность email он должен быть в формате example@email.com"
        );

      case "SIGN-IN: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
        return setAuthError(
          "Доступ временно заблокирован. Вы можете востанновить его сбросив пароль или повторить попытку позже"
        );

      case "SIGN-UP: Firebase: Error (auth/invalid-email).":
        return setAuthError(
          "Проверьте правильность email он должен быть в формате example@email.com"
        );

      case "SIGN-UP: Firebase: Error (auth/email-already-in-use).":
        return setAuthError("Данный email уже используется");

      case "SIGN-UP: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
        return setAuthError(
          "Доступ временно заблокирован. Вы можете востанновить его сбросив пароль или повторить попытку позже"
        );

      case "SIGN-UP: Firebase: Error (auth/admin-restricted-operation).":
        return setAuthError(
          "На данный момент регистрация новых пользователей отключена администрацией"
        );

      case "Firebase: Error (auth/network-request-failed).":
        return setAuthError("Ошибка подключения к интернету");
    }
  }, [error]);

  return <div className={css.error}>{authError}</div>;
}
