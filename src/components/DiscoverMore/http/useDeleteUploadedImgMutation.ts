import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function deleteUploadedImage(id: string) {
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.deleteUploadedImage}/${id}`);
}

const useDeleteUploadedImgMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUploadedImage,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getAllUpLoadedImages],
        refetchType: "all",
      });

      toast.success(res?.data?.message)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useDeleteUploadedImgMutation;
