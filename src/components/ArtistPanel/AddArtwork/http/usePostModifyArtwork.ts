import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

async function usePostModifyArtwork(input: any) {
  return await axiosInstance.patch(
    `/api/artist/modify-artwork/${input.id}`,
    input.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const usePostModifyArtworkMutation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: usePostModifyArtwork,

    onSuccess: async (res) => {
      navigate("/artist-panel/artwork");
      toast.success(t(res.data.message), {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default usePostModifyArtworkMutation;
