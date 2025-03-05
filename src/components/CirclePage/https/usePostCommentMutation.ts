import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";

async function circlePostCommentMutation(data) {
  return await axiosInstance.post(
    `${CIRCLE_ENDPOINTS.PostCircleComment}/${data.id}`,
    data
  );
}

const usePostCommentMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: circlePostCommentMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [CIRCLE_ENDPOINTS.GetCircleComments],
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

export default usePostCommentMutation;
