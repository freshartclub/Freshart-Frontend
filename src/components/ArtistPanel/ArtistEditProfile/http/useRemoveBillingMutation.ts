import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function usePatchRemove(input: any) {
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.RemoveBillingAddress}/${input}`
  );
}

const useRemoveBillingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usePatchRemove,

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

export default useRemoveBillingMutation;
