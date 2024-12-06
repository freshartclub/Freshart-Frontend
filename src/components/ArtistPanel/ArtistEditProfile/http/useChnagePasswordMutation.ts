import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function usePostChnagePassword(input: any) {
  return await axiosInstance.patch(
    ARTTIST_ENDPOINTS.ArtistChangePassword,
    input
  );
}

const useChnagePasswordMutation = () => {
  return useMutation({
    mutationFn: usePostChnagePassword,

    onSuccess: async (res) => {
      console.log("this is from res", res.data);

      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useChnagePasswordMutation;
