import { useMutation } from "@tanstack/react-query";

// import { paths } from 'src/routes/paths';
import axiosInstance from "../../components/utils/axios";

import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";

let toastId: any;

async function verifyOtp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.ValidateOTP, input);
}
const useOtpVerifyMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: async (res, input) => {
      console.log(res.data);

      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/reset-password" + "?id=" + res.data.id);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useOtpVerifyMutation;
