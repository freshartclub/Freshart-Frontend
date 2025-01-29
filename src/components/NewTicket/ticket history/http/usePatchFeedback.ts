import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

const usePatchFeedbackMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const usePatchFeedback = async (input: any) => {
    return await axiosInstance.patch(
      `${ARTTIST_ENDPOINTS.PatchFeedback}/${input.id}`,
      input
    );
  };

  return useMutation({
    mutationFn: usePatchFeedback,
    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["like"],
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

export default usePatchFeedbackMutation;
