import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

let toastId: any;

async function useEditUserProfile(input: any) {
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.editProfile}`, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useEditUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useEditUserProfile,

    onSuccess: async (res) => {
      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useEditUserProfileMutation;
