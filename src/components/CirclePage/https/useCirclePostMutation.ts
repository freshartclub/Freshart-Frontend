import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function circlePostMutation(data) {
  const formData = new FormData();

  if (data?.circleFile && data?.circleFile.length > 0) data.circleFile.map((file) => formData.append("circleFile", file));

  if (data?.existingFiles && data?.existingFiles.length > 0) data.existingFiles.map((file) => formData.append("existingFiles", file));

  if (data?.postId) formData.append("postId", data?.postId);

  formData.append("content", data?.content);
  formData.append("title", data?.title);

  return await axiosInstance.patch(`${CIRCLE_ENDPOINTS.CreateCirclePost}/${data.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useCirclePostMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: circlePostMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [CIRCLE_ENDPOINTS.GetCirclePosts],
      });
      queryClient.invalidateQueries({
        queryKey: [CIRCLE_ENDPOINTS.GetCircleDetails],
      });
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error?.response?.data?.message));
    },
  });
};

export default useCirclePostMutation;
