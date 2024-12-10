import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import { useSearchParams } from "react-router-dom";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";

async function usePostCancel(input , id, orderType) {
  return axiosInstance.patch(
    `${ORDERS_ENDPOINTS.CancelItem}/${id}?orderType=${orderType}`,input
  );
}

const usePostCancelItem = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams(); 

  
  const id = searchParams.get("id");
  const orderType = searchParams.get("orderType");

 

  return useMutation({
    mutationFn: (input) => usePostCancel(input, id, orderType),

    onSuccess: async (res) => {
      // Invalidating the cache for "GetEvidence" to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["acceptOrder"],
        refetchType: "all",
      });

      // Showing success toast message
      toast.success(res.data.message, {
        duration: 3000,
      });
    },

    onError: (error) => {
      console.error(error);
      // Showing error toast message
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default usePostCancelItem;
