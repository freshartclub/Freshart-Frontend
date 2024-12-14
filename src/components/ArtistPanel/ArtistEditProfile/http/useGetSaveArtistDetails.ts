import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

let toastId: any;

async function editArtistProfile(input: any) {
  return await axiosInstance.patch(ARTTIST_ENDPOINTS.EditArtistProfile, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useGetSaveArtistDetailsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editArtistProfile,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["ntohing"],
        refetchType: "all",
      });

      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 3000,
      });

      // navigate("/home");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useGetSaveArtistDetailsMutation;
