import { toast, ToastId } from "react-toastify";

toast.configure({
  autoClose: 8000,
  draggable: false
});

export const notifySuccess = (message: string): ToastId =>
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  });

export const notifyError = (message: string): ToastId =>
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });
