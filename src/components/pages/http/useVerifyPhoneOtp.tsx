import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import { useTranslation } from "react-i18next";

async function verifySMSOtp(input: any) {
  return await axiosInstance.post(ARTTIST_ENDPOINTS.VerifySMSOtp, input);
}

const usePhoneOtpVerify = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: verifySMSOtp,

    onSuccess: async (res) => {
      toast.success(t(res.data.message), {
        duration: 3000,
      });
    },
    onError: (error) => {
      console.log(error.response?.data?.message);
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default usePhoneOtpVerify;
