import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../../../http/apiEndPoints/Auth";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

let toastId: any;

async function addToCart(id) {
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
      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useAddToCartMutation;
