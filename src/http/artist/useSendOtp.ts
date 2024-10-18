import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../components/utils/axios";

import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function sendEmail(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.SignUp, input);
}

const useSendOtp = () => {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useSendOtp;
