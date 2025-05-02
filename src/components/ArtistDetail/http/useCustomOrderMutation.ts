import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function customOder(input) {
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.CustomOrder}/${input?.id}`, input.formData);
}

const useCustomOrderMutation = () => {
  return useMutation({
    mutationFn: customOder,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useCustomOrderMutation;
