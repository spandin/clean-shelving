import css from "./_auth-error.module.scss";

export default function AuthErrors({ error }: { error: string | null }) {
  return (
    <div className={css.error}>
      {(error === "Firebase: Error (auth/invalid-credential)." &&
        "Не верный логин или пароль") ||
        (error === "SIGN-UP: Firebase: Error (auth/invalid-credential)." &&
          "Данный email уже зарегистрирован") ||
        error === "Firebase: Error (auth/invalid-email)." ||
        (error === "SIGN-UP: Firebase: Error (auth/invalid-email)." &&
          "Email не соответствует требования") ||
        (error === "Firebase: Error (auth/network-request-failed)." &&
          "Ошибка подключения к интернету")}
    </div>
  );
}
