import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function removeToCart(values: any) {
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.removeItems}/${values?.id}?type=${values?.type}`,
  );
}

const useRemoveMutation = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeToCart,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.cartItems],
        refetchType: "all",
      });
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useRemoveMutation;
