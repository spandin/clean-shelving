import { ToastOptions, toast } from "react-toastify";

const settingsToast: ToastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
};

const toastAddPromise = (promise: Promise<unknown>) => {
  toast.promise(
    promise,
    {
      pending: "Отправка запроса",
      success: "Добавлено успешно",
      error: "Ошибка при добавлении",
    },
    settingsToast
  );
};

const toastDelPromise = (promise: Promise<unknown>) => {
  toast.promise(
    promise,
    {
      pending: "Отправка запроса",
      success: "Удалено успешно",
      error: "Ошибка при добавлении",
    },
    settingsToast
  );
};

const toastUpdPromise = (promise: Promise<unknown>) => {
  toast.promise(
    promise,
    {
      pending: "Отправка запроса",
      success: "Обновлено успешно",
      error: "Ошибка при обновлении",
    },
    settingsToast
  );
};

const toastAuthErr = () => {
  toast.error("Войдите в аккаунт", settingsToast);
};

export {
  toastAddPromise,
  toastDelPromise,
  toastUpdPromise,
  toastAuthErr,
  settingsToast,
};
