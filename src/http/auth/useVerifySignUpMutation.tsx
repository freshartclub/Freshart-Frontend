import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  forgotPasswordUserId,
  setIsAuthorized,
} from "../../store/userSlice/userSlice";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { setToken } from "../../components/utils/tokenHelper";
import { useTranslation } from "react-i18next";

async function verifyOtp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.ValidateSignUpOTP, input);
}
const VerifySignUpMutation = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: async (res, input) => {
      setToken(res.data.token, input.rememberMe);

      dispatch(forgotPasswordUserId({ userId: res.data.id }));
      dispatch(setIsAuthorized(true));
      localStorage.setItem("profile", "user");
      toast.success(t(res.data.message));
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default VerifySignUpMutation;
