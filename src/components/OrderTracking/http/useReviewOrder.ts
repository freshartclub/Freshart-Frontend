import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

let toastId: any;

async function useReviewOrder(input: any) {
  return await axiosInstance.patch(
    `${ORDERS_ENDPOINTS.ReviewArtwork}/${input.id}/${input.artworkId}`,
    input
  );
}

const usePtachReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useReviewOrder,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["order-single"],
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

export default usePtachReviewMutation;
