import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { ResponseError } from './models';

export const HandleResponseError = (error: unknown) => {
  const err = error as ResponseError;
  const errData = err.response?.data;
  if (errData) {
    toast.error(errData.error);
    if (errData.status === 401) {
      Cookies.remove("access_token");
      window.location.href = "/deal";
    }
  } else {
    toast.error("Something went wrong, please try again.");
  }
};