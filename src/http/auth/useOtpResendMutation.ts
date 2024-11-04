import { useMutation } from "@tanstack/react-query";

// import { paths } from 'src/routes/paths';
import axiosInstance from "../../components/utils/axios";

import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

let toastId: any;

async function resendOtp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.ResendOTP, input);
}
const useOtpResendMutation = () => {
  return useMutation({
    mutationFn: resendOtp,

    onSuccess: async (res, input) => {
      console.log(res.data);

      toast.dismiss(toastId);
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useOtpResendMutation;
