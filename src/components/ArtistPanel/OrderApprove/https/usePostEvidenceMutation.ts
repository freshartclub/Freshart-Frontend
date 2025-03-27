import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";
import axiosInstance from "../../../utils/axios";

async function postEvidence(input) {
  const formData = new FormData();
  Object.entries(input.value).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach((image: File) => {
        formData.append("evidenceImg", image);
      });
    } else {
      formData.append(key, val);
    }
  });

  formData.append("artworkId", input.artworkId);

  return axiosInstance.patch(
    `${ORDERS_ENDPOINTS.AddEvidence}/${input.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const usePostEvidenceMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (input) => postEvidence(input),

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ORDERS_ENDPOINTS.GetArtistOrderDetails],
        refetchType: "all",
      });

      toast.success(t(res.data.message), {
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(t(error.response?.data?.message) || t("An error occurred"));
    },
  });
};

export default usePostEvidenceMutation;
