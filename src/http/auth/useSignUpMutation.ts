import { useMutation } from "@tanstack/react-query";

// import { paths } from 'src/routes/paths';
import axiosInstance from "../../components/utils/axios";
import { setToken } from "../../components/utils/tokenHelper";
import { useAppDispatch } from "../../store/typedReduxHooks";
import {
  forgotPasswordUserId,
  setIsAuthorized,
} from "../../store/userSlice/userSlice";
import toast from "react-hot-toast";

import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";

let toastId: any;

async function signUp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.SignUp, input);
}
const useSignUpMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: signUp,

    onSuccess: async (res, input) => {
      console.log(res.data);
      setToken(res.data.token, input.rememberMe);

      // dispatch(setIsAuthorized(true));
      toast.dismiss(toastId);
      toast.success(res.data.message);
      dispatch(forgotPasswordUserId({ userId: res.data.id }));
      navigate("/sign-up-otp");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useSignUpMutation;
