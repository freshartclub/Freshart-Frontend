import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import { useTranslation } from "react-i18next";

async function usePostSeries(input: any) {
  return await axiosInstance.patch(
    `${ARTTIST_ENDPOINTS.usePatchSeries}`,
    input
  );
}

const usePostSeriesMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: usePostSeries,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getSeries],
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

export default usePostSeriesMutation;
