import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";

async function circleUnfollowMutation(id: string) {
  return await axiosInstance.patch(`${CIRCLE_ENDPOINTS.UnfollowCircle}/${id}`);
}

const useUnfollowMutation = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: circleUnfollowMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [],
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

export default useUnfollowMutation;
