import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function circlePostMutation(data) {
  const formData = new FormData();

  if (data?.circleFile && data?.circleFile.length > 0)
    data.circleFile.map((file) => formData.append("circleFile", file));

  formData.append("content", data?.content);
  formData.append("title", data?.title);

  return await axiosInstance.patch(
    `${CIRCLE_ENDPOINTS.CreateCirclePost}/${data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const useCirclePostMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: circlePostMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["CreateCirclePost"],
        refetchType: "all",
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

export default useCirclePostMutation;
