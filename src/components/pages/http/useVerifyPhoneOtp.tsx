import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

let toastId: any;

async function verifySMSOtp(input: any) {
  return await axiosInstance.post(ARTTIST_ENDPOINTS.VerifySMSOtp, input);
}

const usePhoneOtpVerify = () => {
  return useMutation({
    mutationFn: verifySMSOtp,

    onSuccess: async (res) => {
      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default usePhoneOtpVerify;
