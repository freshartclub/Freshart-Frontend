import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function customOder(input) {


    console.log(input)
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.CustomOrder}/${input?.id}`, input.formData);
}

const useCustomOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customOder,

    onSuccess: async (res) => {
      toast.success( res.message),
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.customOder],
        refetchType: "all",
      });
    },
    
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useCustomOrderMutation;
