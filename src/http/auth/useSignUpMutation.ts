import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { forgotPasswordUserId } from "../../store/slice/userSlice";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function signUp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.SignUp, input);
}
const useSignUpMutation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: signUp,

    onSuccess: async (res, input) => {
      toast.success(t(res.data.message));
      dispatch(forgotPasswordUserId({ userId: res.data.id }));
      navigate("/sign-up-otp");
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useSignUpMutation;
