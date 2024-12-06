import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function usePostSeries(input: any) {
  //   console.log("this is input", id);
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.usePatchSeries}/${input.userID}`,
    input
  );
}

const usePostSeriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usePostSeries,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["GetSeries"],
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

export default usePostSeriesMutation;
