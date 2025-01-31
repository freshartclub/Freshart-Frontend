import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

async function verifyOtp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.ValidateOTP, input);
}

const useOtpVerifyMutation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: async (res, input) => {
      toast.success(t(res.data.message));
      navigate("/reset-password" + "?id=" + res.data.id);
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useOtpVerifyMutation;
