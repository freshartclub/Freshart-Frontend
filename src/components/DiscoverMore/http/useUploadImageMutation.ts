import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

// Mutation function
async function upLoadImg({ id, file }: { id: string; file: File }) {
  const formData = new FormData();
  formData.append("checkImage", file); 

  return await axiosInstance.post(
    `${ARTTIST_ENDPOINTS.upLoadImg}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

// Hook
const useUploadImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upLoadImg,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getUpLoadedImage],
        refetchType: "all",
      });
      toast.success("Image uploaded successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Upload failed");
    },
  });
};

export default useUploadImageMutation;
