import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

let toastId: any;

async function requestOtp(input: any) {
  return await axiosInstance.post(ARTTIST_ENDPOINTS.GetSMSOtp, input);
}

const useGetPhone = () => {
  return useMutation({
    mutationFn: requestOtp,

    onSuccess: async (res) => {
      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useGetPhone;
