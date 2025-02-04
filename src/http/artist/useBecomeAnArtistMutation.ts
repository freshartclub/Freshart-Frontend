import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../components/utils/axios";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function becomeAnArtist(input: any) {
  return await axiosInstance.post(`${AUTH_ENDPOINTS.BecomeAnArtist}?referralCode=${input?.referralCode}`, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useBecomeAnArtistMutation = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: becomeAnArtist,

    onSuccess: async (res) => {
      toast.success(t(res.data.message), {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useBecomeAnArtistMutation;
