import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";
import axiosInstance from "../../../utils/axios";
import { useTranslation } from "react-i18next";

async function usePostCancel(input, id) {
  return axiosInstance.patch(`${ORDERS_ENDPOINTS.CancelItem}/${id}`, input);
}

const usePostCancelItem = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const id = searchParams.get("id");

  return useMutation({
    mutationFn: (input) => usePostCancel(input, id),

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["acceptOrder"],
        refetchType: "all",
      });
      
      toast.success(t(res.data.message), {
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default usePostCancelItem;
