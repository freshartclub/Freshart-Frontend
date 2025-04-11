import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useTranslation } from "react-i18next";

async function sendEmail(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.SignUp, input);
}

const useSendOtp = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: sendEmail,
    onSuccess: async (res) => {
      toast.success(t(res.data.message));
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useSendOtp;
