import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { setIsAuthorized, forgotPasswordUserId } from "../../store/userSlice/userSlice";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate, useSearchParams } from "react-router-dom";

let toastId: any;

async function forgotPasswordOTP(input: any) {
  return await axiosInstance.post(AUTH_ENDPOINTS.ForgotPasswordOTP, input);
}
const useForgotPasswordMutation = () => {
  // const [searchParam,setSearchParam] = useSearchParams();

  // const id = searchParam.get('id');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: forgotPasswordOTP,

    onSuccess: async (res, input) => {
      console.log(res.data.id);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      dispatch(forgotPasswordUserId({userId:res.data.id}));
      navigate("/otp");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useForgotPasswordMutation;
