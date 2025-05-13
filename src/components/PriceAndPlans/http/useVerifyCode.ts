import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import axiosInstance from "../../utils/axios";

async function verifyCode(otp: string) {
  return axiosInstance.patch(`${ORDERS_ENDPOINTS.verifyCode}`, { otp: otp });
}

const useVerifyCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyCode,

    onSuccess: async (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: [ORDERS_ENDPOINTS.checkRef],
        refetchType: "all",
      });
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useVerifyCode;
