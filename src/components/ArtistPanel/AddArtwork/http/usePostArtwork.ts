import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function usePostArtWork(input: any) {
  return await axiosInstance.post(
    `/api/artist/add-artwork/${input.id}`,
    input.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const usePostArtWorkMutation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: usePostArtWork,

    onSuccess: async (res) => {
      navigate(
        `${
          id
            ? `/artist-panel/artwork/preview?id=${id}&preview=true`
            : `/artist-panel/artwork/preview?id=${res.data.artwork._id}&preview=true`
        }`
      );
      toast.success(t(res.data.message), {
        duration: 3000,
      });

      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.GetNotifications],
        refetchType: "all",
      });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default usePostArtWorkMutation;
