import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import axiosInstance from "../../utils/axios";

async function sendCode(phone: string) {
  return axiosInstance.post(`${ORDERS_ENDPOINTS.sendCode}`, { phone: phone });
}

const useSendCode = () => {
  return useMutation({
    mutationFn: sendCode,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useSendCode;
