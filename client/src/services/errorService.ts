import React from "react";
import { toast } from "react-toastify";

class ErrorService {
  static handler(
    error: any,
    callback?: React.Dispatch<
      React.SetStateAction<{
        isOpen: boolean;
        message: string;
      }>
    >
  ) {
    const response = error?.response;
    if (callback) {
      callback({ isOpen: true, message: response?.data?.message });
    } else {
      if (response?.status >= 500) toast.error("An unexpected error occured.", { className: "toast-message" });
      else if (typeof response?.data === "string") toast.error(response?.data, { className: "toast-message" });
      else toast.error(response?.data?.message, { className: "toast-message" });
    }
  }
}

export default ErrorService;
