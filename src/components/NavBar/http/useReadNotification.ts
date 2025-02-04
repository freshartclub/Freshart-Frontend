import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function readNotification(id: any) {
  return axiosInstance.patch(`${ARTTIST_ENDPOINTS.ReadNotification}/${id}`);
}

const useReadNotification = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: readNotification,


    onSuccess: async (res, input) => {
        queryClient.invalidateQueries({
            queryKey: [ARTTIST_ENDPOINTS.GetNotifications],
            refetchType: "all",
          });

      console.log(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useReadNotification;
