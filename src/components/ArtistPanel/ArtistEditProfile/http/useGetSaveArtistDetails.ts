import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";
import { useTranslation } from "react-i18next";

async function editArtistProfile(input: any) {
  return await axiosInstance.patch(ARTTIST_ENDPOINTS.EditArtistProfile, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useGetSaveArtistDetailsMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: editArtistProfile,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.GetSingleArtistDetials],
        refetchType: "all",
      });

      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useGetSaveArtistDetailsMutation;
