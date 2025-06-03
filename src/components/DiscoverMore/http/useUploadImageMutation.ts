import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

// Mutation function
async function upLoadImg({ id, file , height , width }: { id: string; file: File }) {
  const formData = new FormData();
  formData.append("checkImage", file); 
  formData.append("height" , height)
  formData.append("width" , width)

  return await axiosInstance.post(
    `${ARTTIST_ENDPOINTS.upLoadImg}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}


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
