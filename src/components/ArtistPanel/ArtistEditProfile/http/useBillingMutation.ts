import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";
import { useTranslation } from "react-i18next";

async function usePostBilling(input: any) {
  if (input?.id) {
    return await axiosInstance.post(
      `${ARTTIST_ENDPOINTS.AddBillingAddress}/${input.id}`,
      input.data
    );
  } else {
    return await axiosInstance.post(
      ARTTIST_ENDPOINTS.AddBillingAddress,
      input.data
    );
  }
}

const useBillingMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: usePostBilling,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.GetBillingAddress],
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

export default useBillingMutation;
