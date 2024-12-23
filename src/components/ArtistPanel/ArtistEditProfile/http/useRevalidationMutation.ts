import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function usePatchRevalidation() {
  return await axiosInstance.patch(ARTTIST_ENDPOINTS.PatchRevalidation);
}

const useRevalidationMutation = () => {
  return useMutation({
    mutationFn: usePatchRevalidation,

    onSuccess: async (res) => {
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useRevalidationMutation;
