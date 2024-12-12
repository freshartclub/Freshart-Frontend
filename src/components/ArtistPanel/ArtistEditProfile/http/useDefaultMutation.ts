import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function usePatchDefault(input: any) {
  console.log("this is input", input);
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.SetDefaultAddress}/${input}`
  );
}

const useDefaultMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usePatchDefault,

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

export default useDefaultMutation;
