import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import { useTranslation } from "react-i18next";

async function useReviewOrder(input: any) {
  return await axiosInstance.patch(
    `${ORDERS_ENDPOINTS.ReviewArtwork}/${input.id}/${input.artworkId}`,
    input
  );
}

const usePtachReviewMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: useReviewOrder,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["order-single"],
        refetchType: "all",
      });
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default usePtachReviewMutation;
