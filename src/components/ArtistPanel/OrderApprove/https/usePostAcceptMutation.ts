import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";
let toastId: any;

async function acceptOrder(newData) {
  return await axiosInstance.patch(
    `${ORDERS_ENDPOINTS.AcceptOrder}/${newData.id}?orderType=${newData.orderType}`,
    newData
  );
}

const usePostAcceptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptOrder,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["acceptOrder"],
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

export default usePostAcceptMutation;
