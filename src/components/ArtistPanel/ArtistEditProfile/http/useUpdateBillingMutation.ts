import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function usePatchBilling(input: any) {
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.UpdateBillingAddress}/${input}`
  );
}

const useUpdateBillingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usePatchBilling,

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

export default useUpdateBillingMutation;
