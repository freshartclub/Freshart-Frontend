import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function addToCart(id: string) {
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.addToCart}/${id}`);
}

const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.cartItems],
        refetchType: "all",
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useAddToCartMutation;
