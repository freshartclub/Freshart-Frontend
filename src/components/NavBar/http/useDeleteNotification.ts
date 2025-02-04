import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function deleteNotification(id: any) {

    console.log(id)
    if(id){
        return axiosInstance.patch(`${ARTTIST_ENDPOINTS.DeleteNotification}/${id}`);
    }else{
        return axiosInstance.patch(`${ARTTIST_ENDPOINTS.DeleteNotification}`);
    }
 
}

const useDeleteNotification = () => {
    const queryClient = useQueryClient();
  return useMutation({

    mutationFn: deleteNotification,

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

export default useDeleteNotification;
