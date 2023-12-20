import { ToastOptions, toast } from "react-toastify";

const settingsToast: ToastOptions = {
  position: "bottom-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  theme: "dark",
};

const toastAuthErr = () => {
  toast.error("Войдите в аккаунт");
};

const toastSuccess = () => {
  toast.success("Успех");
};

const toastError = () => {
  toast.error("Ошибка");
};

const toastWarn = () => {
  toast.warn("Внимание");
};

const toastInfo = () => {
  toast.info("Инфо");
};

export {
  toastAuthErr,
  toastSuccess,
  toastError,
  toastWarn,
  toastInfo,
  settingsToast,
};
