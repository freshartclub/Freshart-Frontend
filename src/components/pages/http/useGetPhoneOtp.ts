import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import { useTranslation } from "react-i18next";

async function requestOtp(input: any) {
  return await axiosInstance.post(ARTTIST_ENDPOINTS.GetSMSOtp, input);
}

const useGetPhone = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: requestOtp,

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

export default useGetPhone;
