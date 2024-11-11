import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

let toastId: any;

async function removeToCart(id: string) {
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.removeItems}/${id}`);
}

const useGetCartItemsRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeToCart,
    onSuccess: (res) => {
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

export default useGetCartItemsRemove;
