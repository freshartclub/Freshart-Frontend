import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import { useTranslation } from "react-i18next";

async function usePatchRevalidation() {
  return await axiosInstance.patch(ARTTIST_ENDPOINTS.PatchRevalidation);
}

const useRevalidationMutation = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: usePatchRevalidation,

    onSuccess: async (res) => {
      toast.success(t(res.data.message), {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default useRevalidationMutation;
