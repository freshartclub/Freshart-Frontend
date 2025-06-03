import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

// Mutation function to update crop values (no file)
async function updateCropValues({
  id,
  name,
  area_x1,
  area_y1,
  area_x2,
  area_y2,
}: {
  id: string;
  name?: string;
  area_x1: number;
  area_y1: number;
  area_x2: number;
  area_y2: number;
}) {
  return await axiosInstance.post(
    ARTTIST_ENDPOINTS.updateUploadCrop,
    {
      _id: id, 
      name,
      area_x1,
      area_y1,
      area_x2,
      area_y2,
    }
  );
}

const useUpdateValuesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCropValues,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getUpLoadedImage],
        refetchType: "all",
      });
      toast.success("Crop area updated successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

export default useUpdateValuesMutation;
