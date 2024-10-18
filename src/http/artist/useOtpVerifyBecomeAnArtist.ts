import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../components/utils/axios";

import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function verifyOtp(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.ValidateSignUpOTP, input);
}
const useOtpVerifyMutationBecomeAnArtist = () => {
  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: async (res, input) => {
      toast.success(res.data.message);
      // After successful OTP verification, you can update the user's status to become an artist
      // Example: updateUserStatus(input.userId, "artist");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useOtpVerifyMutationBecomeAnArtist;
