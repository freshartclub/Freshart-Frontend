import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";

async function circleFollowMutation(id: string) {
  return await axiosInstance.post(`${CIRCLE_ENDPOINTS.FollowCircle}/${id}`);
}

const usePostFollowMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: circleFollowMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
      toast.success(t(res.data.message), {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default usePostFollowMutation;
