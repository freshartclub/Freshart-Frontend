import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { forgotPasswordUserId } from "../../store/slice/userSlice";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function forgotPasswordOTP(input: any) {
  return await axiosInstance.post(AUTH_ENDPOINTS.ForgotPasswordOTP, input);
}

const useForgotPasswordMutation = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: forgotPasswordOTP,

    onSuccess: async (res, input) => {
      toast.success(t(res.data.message));
      dispatch(forgotPasswordUserId({ userId: res.data.id }));
      navigate("/otp");
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useForgotPasswordMutation;
