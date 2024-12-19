import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function useDeleteSeries(input: any) {
  console.log("this is input", input);
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.useDeleteSeries}`, {
    name: input,
  });
}

const useDeleteSeriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useDeleteSeries,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getSeries],
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

export default useDeleteSeriesMutation;
