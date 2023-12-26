import { ToastOptions, toast } from "react-toastify";

const settingsToast: ToastOptions = {
  position: "bottom-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  theme: "dark",
};

const toastPromise = async (promise: Promise<unknown>) => {
  await toast.promise(
    promise,
    {
      pending: "Загрузка на сервер",
      success: "Загружено успешно",
      error: "Ошибка при добавлении",
    },
    settingsToast
  );
};

const toastAuthErr = () => {
  toast.error("Войдите в аккаунт", settingsToast);
};

const toastSuccess = (msg: string) => {
  toast.success(msg, settingsToast);
};

const toastError = (e: string) => {
  toast.error(e, settingsToast);
};

const toastWarn = () => {
  toast.warn("Внимание", settingsToast);
};

const toastInfo = () => {
  toast.info("Инфо", settingsToast);
};

export {
  toastPromise,
  toastAuthErr,
  toastSuccess,
  toastError,
  toastWarn,
  toastInfo,
  settingsToast,
};
