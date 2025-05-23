import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";

async function circlePostLikeMutation(data) {
  return await axiosInstance.patch(`${CIRCLE_ENDPOINTS.LikeCirclePost}/${data?.postId}`, data);
}

const usePostLikeMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: circlePostLikeMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [CIRCLE_ENDPOINTS.GetCirclePosts],
        refetchType: "all",
      });
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error?.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default usePostLikeMutation;
