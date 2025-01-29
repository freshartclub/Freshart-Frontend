import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";
import { useTranslation } from "react-i18next";

async function acceptOrder(newData) {
  return await axiosInstance.patch(
    `${ORDERS_ENDPOINTS.AcceptOrder}/${newData.id}`,
    newData
  );
}

const usePostAcceptMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptOrder,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["acceptOrder"],
        refetchType: "all",
      });
      toast.success(t(res.data.message), {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default usePostAcceptMutation;
