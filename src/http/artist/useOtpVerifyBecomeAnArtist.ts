import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useTranslation } from "react-i18next";

async function verifyOtp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.ValidateSignUpOTP, input);
}

const useOtpVerifyMutationBecomeAnArtist = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: async (res, input) => {
      toast.success(t(res.data.message));
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useOtpVerifyMutationBecomeAnArtist;
