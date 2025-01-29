import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";
import { useTranslation } from "react-i18next";

async function usePatchBilling(input: any) {
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.UpdateBillingAddress}/${input}`
  );
}

const useUpdateBillingMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: usePatchBilling,

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
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useUpdateBillingMutation;
