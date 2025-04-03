import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function getSubscription(input: any) {
  return await axiosInstance.post(ORDERS_ENDPOINTS.createPayer, input);
}

const useCreatePayer = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getSubscription,
    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ORDERS_ENDPOINTS.checkRef],
        refetchType: "all",
      });
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useCreatePayer;
