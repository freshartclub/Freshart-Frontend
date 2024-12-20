import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function usePostBilling(input: any) {
  if (input?.id) {
    console.log("haan yeh wala");
    return await axiosInstance.post(
      `${ARTTIST_ENDPOINTS.AddBillingAddress}/${input.id}`,
      input.data
    );
  } else {
    return await axiosInstance.post(
      ARTTIST_ENDPOINTS.AddBillingAddress,
      input.data
    );
  }
}

const useBillingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usePostBilling,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.GetBillingAddress],
        refetchType: "all",
      });
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useBillingMutation;
