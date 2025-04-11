import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";

async function circleRequestAcceptMutation(data) {
  return await axiosInstance.patch(
    `${CIRCLE_ENDPOINTS.ApproveRequest}/${data?.circleId}`,
    data
  );
}

const useRequestAcceptMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: circleRequestAcceptMutation,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [CIRCLE_ENDPOINTS.FollowRequests],
      });
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default useRequestAcceptMutation;
